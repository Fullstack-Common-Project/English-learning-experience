using EnglishGamesPlatform.Backend.Models.DTOs;

namespace EnglishGamesPlatform.Backend.Services.Interfaces
{
    public interface IAuthService
    {
        Task<Response<UserResponse>> Login(LoginDto user);
        Task<Response<UserResponse>> Register(RegisterDTO user);
    }

}
