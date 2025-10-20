using EnglishGamesPlatform.Backend.Models;
using EnglishGamesPlatform.Backend.Repositories.Classes.Entities;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;
using EnglishGamesPlatform.Backend.Services.Interfaces;

namespace EnglishGamesPlatform.Backend.Services.Classes
{
    public class GeneralGameService : IGeneralGameService
    {
        private readonly Dictionary<int, IGeneralGameRepository> _repositories;

        private readonly GameResultRepository _gameResultRepository;

        public GeneralGameService(IEnumerable<IGeneralGameRepository> repositories,GameResultRepository gameResultRepository)
        {
            _repositories = repositories.ToDictionary(r => r.GameID);
            _gameResultRepository = gameResultRepository;
        }

        public async Task<Response<GameData>> GetGameDataAsync(int gameId)
        {
            if (_repositories.TryGetValue(gameId, out var repository))
            {
                GameInitialData gameInitialData = repository.GetData();

                return new()
                {
                    StatusCode = StatusCodes.Status200OK,
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
                    StatusCode = StatusCodes.Status500InternalServerError,
                    IsSuccess = false,
                    Message = $"Error Dependencies Injection - Repository",
                };
            }
        }

        public async Task<Response<LeaderboardData>> GetLeaderboardAsync(int gameId)
        {
            var topResults = await _gameResultRepository.GetTop10ByGameAsync(gameId);

            return new()
            {
                StatusCode = StatusCodes.Status200OK,
                IsSuccess = true,
                Message = $"Successfully retrieved the list of the 10 top players for game {gameId}.",
                Data = topResults
            };
        }
    }
}
