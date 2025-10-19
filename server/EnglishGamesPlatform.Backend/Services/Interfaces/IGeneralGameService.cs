using EnglishGamesPlatform.Backend.Models;

namespace EnglishGamesPlatform.Backend.Services.Interfaces
{
    public interface IGeneralGameService
    {
        Task<Response<GameData>> GetGameDataAsync(int gameId);

        Task<Response<LeaderboardData>> GetLeaderboardAsync(int gameId);
    }
}
