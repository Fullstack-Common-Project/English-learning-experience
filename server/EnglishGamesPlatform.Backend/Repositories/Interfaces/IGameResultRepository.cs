using EnglishGamesPlatform.Backend.Models;

namespace EnglishGamesPlatform.Backend.Repositories.Interfaces
{
    public interface IGameResultRepository
    {
        Task<LeaderboardData> GetTop10ByGameAsync(int gameId);
    }
}
