using EnglishGamesPlatform.Backend.Models;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;
using EnglishGamesPlatform.Backend.Services.Interfaces;

namespace EnglishGamesPlatform.Backend.Services.Classes
{
    public class GeneralGameService : IGeneralGameService
    {
        private readonly Dictionary<int, IGeneralGameRepository> _repositories;

        public GeneralGameService(IEnumerable<IGeneralGameRepository> repositories)
        {
            _repositories = repositories.ToDictionary(r => r.GameID);
        }

        public async Task<Response<GameData>> GetGameDataAsync(int gameId)
        {
            if (_repositories.TryGetValue(gameId, out var repository))
            {
                GameInitialData gameInitialData = repository.GetData();

                return new()
                {
                    StatusCode = System.Net.HttpStatusCode.OK,
                    IsSuccess = true,
                    Message = $"Get Initial Data For Game ID: {gameId} Successfully,",
                    Data = new GameData()
                    {
                        GameId = gameId,
                        Data = gameInitialData
                    }
                };
            }
            else
            {
                return new()
                {
                    StatusCode = System.Net.HttpStatusCode.InternalServerError,
                    IsSuccess = false,
                    Message = $"Error Dependencies Injection - Repository",
                };
            }
        }

        public async Task<Response<LeaderboardData>> GetLeaderboardAsync(int gameId)
        {
            throw new NotImplementedException();
        }
    }
}
