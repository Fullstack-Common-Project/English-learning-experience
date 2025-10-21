using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.Entities;

namespace EnglishGamesPlatform.Backend.Repositories.Interfaces
{
    public interface IGameResultRepository
    {
        Task<LeaderboardData> GetTop10ByGameAsync(int gameId);

        Task<GameResult> AddGameResultAsync(GameResult gameResult);

        Task<IEnumerable<GameResult>> GetTopGameResultsByGameIdAsync(int gameId, int topCount);
    }
}
