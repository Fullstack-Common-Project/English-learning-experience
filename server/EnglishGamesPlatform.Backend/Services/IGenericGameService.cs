using EnglishGamesPlatform.Backend.Models;

namespace EnglishGamesPlatform.Backend.Services
{
    public interface IGenericGameService<T>
    {
        Task<Response<GameData<T>>> GetGameDataAsync();

        Task<Response<GameData<List<LeaderboardEntry>>>> GetLeaderboardAsync();

    }
}
