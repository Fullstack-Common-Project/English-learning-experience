using EnglishGamesPlatform.Backend.Models.DTOs;

namespace EnglishGamesPlatform.Backend.Repositories.Interfaces
{
    public interface IGameResultRepository
    {
        Task<LeaderboardData> GetTop10ByGameAsync(int gameId);
    }
}
