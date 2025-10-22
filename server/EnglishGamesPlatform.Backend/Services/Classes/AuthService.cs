using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.Entities;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;
using EnglishGamesPlatform.Backend.Services.Interfaces;
using EnglishGamesPlatform.Backend.Utils;
using EnglishGamesPlatform.Backend.Validation;
using Google.Apis.Auth;

namespace EnglishGamesPlatform.Backend.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _authRepository;
        private readonly TokenService _tokenService;

        public AuthService(IAuthRepository authRepository, TokenService tokenService)
        {
            _authRepository = authRepository;
            _tokenService = tokenService;
        }

        public async Task<Response<UserResponse>> Login(LoginDto user)
        {
            var (password, email) = (user.Password, user.Email);

            if (!email.IsValidEmail())
                return new Response<UserResponse>
                {
                    IsSuccess = false,
                    StatusCode = System.Net.HttpStatusCode.BadRequest,
                    Message = "Email is not valid",
                };
            if (!password.IsValidPassword())
                return new Response<UserResponse>
                {
                    IsSuccess = false,
                    StatusCode = System.Net.HttpStatusCode.BadRequest,
                    Message = "Password is not valid",
                };
            var result = await _authRepository.IsExistingUser(email);
            if (result != null)
            {
                if (!BCrypt.Net.BCrypt.Verify(password, result.Password))
                    return new Response<UserResponse>
                    {
                        IsSuccess = false,
                        StatusCode = System.Net.HttpStatusCode.Unauthorized,
                        Message = "Incorrect password",
                    };
                var token = _tokenService.GenerateToken(result!.Email);
                return new Response<UserResponse>
                {
                    IsSuccess = true,
                    StatusCode = System.Net.HttpStatusCode.OK,
                    Message = "Login successful",
                    Data = new UserResponse
                    {
                        Token = token,
                        User = new User { UserId = result.UserId, FullName = result.FullName },
                    },
                };
            }

            return new Response<UserResponse>
            {
                IsSuccess = false,
                StatusCode = System.Net.HttpStatusCode.NotFound,
                Message = "User not found",
            };
        }

        public async Task<Response<UserResponse>> Register(RegisterDTO user)
        {
            var (username, password, email) = (user.FullName!, user.Password, user.Email);

            if (!username.IsValidUsername())
                return new Response<UserResponse>
                {
                    IsSuccess = false,
                    StatusCode = System.Net.HttpStatusCode.BadRequest,
                    Message = "UserName is not valid",
                };
            if (!password.IsValidPassword())
                return new Response<UserResponse>
                {
                    IsSuccess = false,
                    StatusCode = System.Net.HttpStatusCode.BadRequest,
                    Message = "Password is not valid",
                };
            if (!email.IsValidEmail())
                return new Response<UserResponse>
                {
                    IsSuccess = false,
                    StatusCode = System.Net.HttpStatusCode.BadRequest,
                    Message = "Email is not valid",
                };
            var result = await _authRepository.IsExistingUser(email);
            if (result != null)
                return new Response<UserResponse>
                {
                    IsSuccess = false,
                    StatusCode = System.Net.HttpStatusCode.Conflict,
                    Message = "User already exists",
                };

            var res = await _authRepository.Register(
                new RegisterDTO
                {
                    FullName = username,
                    Password = BCrypt.Net.BCrypt.HashPassword(password),
                    Email = email,
                }
            );

            var token = _tokenService.GenerateToken(email);
            return new Response<UserResponse>
            {
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.Created,
                Message = "Registration successful",
                Data = new UserResponse
                {
                    Token = token,
                    User = new User { UserId = res!.UserId, FullName = res.FullName },
                },
            };
        }

        public async Task<Response<UserResponse>> GoogleLogin(string idToken)
        {
            var res = new Response<UserResponse>();

            try
            {
                var payload = await GoogleJsonWebSignature.ValidateAsync(idToken);
                var userEntity = await _authRepository.IsExistingUser(payload.Email);

                if (userEntity == null)
                {
                    var newUser = new RegisterDTO
                    {
                        Email = payload.Email,
                        FullName = payload.Name,
                    };

                    var createdUser = await _authRepository.Register(newUser);

                    userEntity = new User
                    {
                        UserId = createdUser.UserId,
                        FullName = createdUser.FullName,
                        Email = createdUser.Email,
                    };
                }

                var token = _tokenService.GenerateToken(userEntity.Email);

                res.IsSuccess = true;
                res.StatusCode = System.Net.HttpStatusCode.OK;
                res.Message = "Google login successful";
                res.Data = new UserResponse { Token = token, User = userEntity };
            }
            catch (Exception ex)
            {
                res.IsSuccess = false;
                res.Message = ex.Message;
                res.StatusCode = System.Net.HttpStatusCode.BadRequest;
            }

            return res;
        }
    }
}
