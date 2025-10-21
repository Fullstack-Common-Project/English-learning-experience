using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.Entities;

namespace EnglishGamesPlatform.Backend.Repositories.Interfaces
{
    public interface IAuthRepository
    {
        //public Task<User?> Login(string email);
        public Task<User> Register(RegisterDTO newUser);
        public Task<User?> IsExistingUser(string email);
    }
}
