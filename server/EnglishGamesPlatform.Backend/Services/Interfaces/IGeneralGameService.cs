using EnglishGamesPlatform.Backend.Models;
using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.DTOs.Entities_DTOs;

namespace EnglishGamesPlatform.Backend.Services.Interfaces
{
    public interface IGeneralGameService
    {
        Task<Response<GameData>> GetGameDataAsync(int gameId);

        Task<Response<LeaderboardData>> GetLeaderboardAsync(int gameId);

        Task<Response<FinalGameStatus>> GetFinalGameStatusAndAddGameResultAsync(GameResultDTO gameResultDTO); 
    }
}
