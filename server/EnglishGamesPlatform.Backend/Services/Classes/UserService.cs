using EnglishGamesPlatform.Backend.Models;
using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.Entities;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;
using EnglishGamesPlatform.Backend.Services.Interfaces;

namespace EnglishGamesPlatform.Backend.Services.Classes
{
    public class UserService : IGenericService<User>
    {

        public async Task<Response<IEnumerable<User>>> GetAllAsync()
        {
            IEnumerable<User> users = null;

            return new Response<IEnumerable<User>>
            {
                IsSuccess = true,
                StatusCode = StatusCodes.Status200OK,
                Message = "Users retrieved successfully.",
                Data = users
            };
        }
    }
}
