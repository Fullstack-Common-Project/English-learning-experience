using EnglishGamesPlatform.Backend.Models.Entities;

namespace EnglishGamesPlatform.Backend.Repositories.Interfaces
{
    public interface IGameRepository
    {
        Task<IEnumerable<Game>> GetAllAsync();

        Task<Game?> GetByIdAsync(int id);

        Task<string?> GetGameNameByIdAsync(int gameId);
    }
}
