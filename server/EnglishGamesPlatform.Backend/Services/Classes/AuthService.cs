using EnglishGamesPlatform.Backend.Models;
using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.Entities;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;
using EnglishGamesPlatform.Backend.Services.Interfaces;
using EnglishGamesPlatform.Backend.Utils;
using EnglishGamesPlatform.Backend.Validation;


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
                return new Response<UserResponse> { IsSuccess = false, StatusCode = System.Net.HttpStatusCode.BadRequest, Message = "Email is not valid" };
            if (!password.IsValidPassword())
                return new Response<UserResponse> { IsSuccess = false, StatusCode = System.Net.HttpStatusCode.BadRequest, Message = "Password is not valid" };
            var result = await _authRepository.IsExistingUser(email);
            if (result != null)
            {
                if (!BCrypt.Net.BCrypt.Verify(password, result.Password))
                    return new Response<UserResponse> { IsSuccess = false, StatusCode = System.Net.HttpStatusCode.Unauthorized, Message = "Incorrect password" };
                var token = _tokenService.GenerateToken(result!.Email);
                return new Response<UserResponse>
                {
                    IsSuccess = true,
                    StatusCode = System.Net.HttpStatusCode.OK,
                    Message = "Login successful",
                    Data = new UserResponse
                    {
                        Token = token,
                        User = new User { UserId = result.UserId, FullName = result.FullName }
                    }
                };
            }

            return new Response<UserResponse> { IsSuccess = false, StatusCode = System.Net.HttpStatusCode.NotFound, Message = "User not found" };
        }


        public async Task<Response<UserResponse>> Register(RegisterDTO user)
        {
            var (username, password, email) = (user.FullName!, user.Password, user.Email);

            if (!username.IsValidUsername())
                return new Response<UserResponse> { IsSuccess = false, StatusCode = System.Net.HttpStatusCode.BadRequest, Message = "UserName is not valid" };
            if (!password.IsValidPassword())
                return new Response<UserResponse> { IsSuccess = false, StatusCode = System.Net.HttpStatusCode.BadRequest, Message = "Password is not valid" };
            if (!email.IsValidEmail())
                return new Response<UserResponse> { IsSuccess = false, StatusCode = System.Net.HttpStatusCode.BadRequest, Message = "Email is not valid" };
            var result = await _authRepository.IsExistingUser(email);
            if (result != null)
                return new Response<UserResponse> { IsSuccess = false, StatusCode = System.Net.HttpStatusCode.Conflict, Message = "User already exists" };

            await _authRepository.Register(new RegisterDTO { FullName = username, Password = BCrypt.Net.BCrypt.HashPassword(password), Email = email });

            var token = _tokenService.GenerateToken(email);
            return new Response<UserResponse>
            {
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.Created,
                Message = "Registration successful",
                Data = new UserResponse
                {
                    Token = token,
                    User = new User { UserId = result!.UserId, FullName = result.FullName }
                }
            };
        }


    }
}
