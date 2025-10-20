using EnglishGamesPlatform.Backend.Models;
using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.Entities;

namespace EnglishGamesPlatform.Backend.Services.Interfaces
{
    public interface IAuthService
    {
        Task<Response<string>> Login(LoginDto user);
        Task<Response<string>> Register(RegisterDTO user);
    }

}
