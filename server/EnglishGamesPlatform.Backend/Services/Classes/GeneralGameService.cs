using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.DTOs.Entities_DTOs;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;
using EnglishGamesPlatform.Backend.Services.Interfaces;

namespace EnglishGamesPlatform.Backend.Services.Classes
{
    public class GeneralGameService : IGeneralGameService
    {
        private readonly Dictionary<string, IGeneralGameRepository> _repositories;

        private readonly IGameRepository _gameRepository;


        public GeneralGameService(IEnumerable<IGeneralGameRepository> repositories, IGameRepository gameRepository)
        {
            _repositories = repositories.ToDictionary(r => r.GameName);
            _gameRepository = gameRepository;
        }

        public Task<Response<FinalGameStatus>> GetFinalGameStatusAsync(GameResultDTO gameResultDTO)
        {
            throw new NotImplementedException();
        }

        public async Task<Response<GameData>> GetGameDataAsync(int gameId)
        {
            string? gameName = await GetGameNameByIdAsync(gameId);

            if (gameName == null)
            {
                return new ()
                {
                    IsSuccess = false,
                    StatusCode = StatusCodes.Status404NotFound,
                    Message = $"Game ID: {gameId} Not Found",
                };
            }

            if (_repositories.TryGetValue("Picture Hangman", out var repository))
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
                return new ()
                {
                    StatusCode = StatusCodes.Status500InternalServerError,
                    IsSuccess = false,
                    Message = $"Error Dependencies Injection - Repository",
                };
            }
        }

        public async Task<Response<LeaderboardData>> GetLeaderboardAsync(int gameId)
        {
            throw new NotImplementedException();
        }

        #region Private Methods

        private async Task<string?> GetGameNameByIdAsync(int gameId)
        {
            return await _gameRepository.GetGameNameByIdAsync(gameId);
        }

        #endregion
    }
}
