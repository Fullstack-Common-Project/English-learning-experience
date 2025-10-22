using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.DTOs.Entities_DTOs;

namespace EnglishGamesPlatform.Backend.Services.Interfaces
{
    public interface IGameService
    {
        Task<Response<IEnumerable<GameDTO>>> GetAllAsync();
    }
}
