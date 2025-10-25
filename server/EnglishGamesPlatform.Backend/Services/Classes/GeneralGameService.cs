using AutoMapper;
using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.DTOs.Entities_DTOs;
<<<<<<< HEAD
using EnglishGamesPlatform.Backend.Models.GameInitialDatas;

using EnglishGamesPlatform.Backend.Models.Entities;
using EnglishGamesPlatform.Backend.Models.GameInitialDatas;
using EnglishGamesPlatform.Backend.Models.GameInitialDatas;
=======
using EnglishGamesPlatform.Backend.Models.Entities;
>>>>>>> origin/main-v2
using EnglishGamesPlatform.Backend.Repositories.Interfaces;
using EnglishGamesPlatform.Backend.Services.Interfaces;
using System.Net;

namespace EnglishGamesPlatform.Backend.Services.Classes
{
    public class GeneralGameService : IGeneralGameService
    {
        private readonly Dictionary<string, IGeneralGameRepository> _repositories;
        private readonly IGameRepository _gameRepository;
        private readonly IGameResultRepository _gameResultRepository;
        private readonly IMapper _mapper;

        public GeneralGameService(
            IEnumerable<IGeneralGameRepository> repositories,
            IGameRepository gameRepository,
            IGameResultRepository gameResultRepository,
            IMapper mapper
        )
        {
            _repositories = repositories.ToDictionary(r => r.GameName);
            _gameRepository = gameRepository;
            _gameResultRepository = gameResultRepository;
            _mapper = mapper;
        }

<<<<<<< HEAD
        public async Task<Response<FinalGameStatus>> GetFinalGameStatusAndAddGameResultAsync(
            GameResultDTO gameResultDTO
        )
=======


        public async Task<Response<FinalGameStatus>> GetFinalGameStatusAndAddGameResultAsync(GameResultDTO gameResultDTO)
>>>>>>> origin/main-v2
        {
            if (gameResultDTO == null)
            {
                return new()
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.BadRequest,
                    Message = "Invalid Game Result Data.",
                };
            }

<<<<<<< HEAD
            GameResult gameResult = await AddGameResultAsync(
                _mapper.Map<GameResult>(gameResultDTO)
            );
=======
            GameResult gameResult = await AddGameResultAsync(_mapper.Map<GameResult>(gameResultDTO));
>>>>>>> origin/main-v2

            int index = await GetRankByUserId(gameResultDTO.GameID, gameResultDTO.UserID, 10);

            if (index == -1)
            {
                return new()
                {
                    IsSuccess = true,
                    StatusCode = HttpStatusCode.OK,
                    Message = "Add Game Result Successfully.",
<<<<<<< HEAD
                    Data = new() { IsLeadingPlayer = false },
=======

                    Data = new ()
                    {
                        IsLeadingPlayer = false,
                    }
>>>>>>> origin/main-v2
                };
            }

            return new Response<FinalGameStatus>()
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK,
                Message = "Add Game Result Successfully.",
<<<<<<< HEAD
                Data = new FinalGameStatus() { IsLeadingPlayer = true, Rank = index + 1 },
=======
                Data = new FinalGameStatus()
                {
                    IsLeadingPlayer = true,
                    Rank = index + 1
                }
>>>>>>> origin/main-v2
            };
        }

        public async Task<Response<GameData>> GetGameDataAsync(int gameId)
        {
            string? gameName = await GetGameNameByIdAsync(gameId);

            if (gameName == null)
            {
                return new()
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.NotFound,
                    Message = $"Game ID: {gameId} Not Found",
                };
            }

            if (_repositories.TryGetValue(gameName, out var repository))
            {
                GameInitialData? gameInitialData = await repository.GetData();

                return new()
                {
                    StatusCode = HttpStatusCode.OK,
                    IsSuccess = true,
                    Message = $"Get Initial Data For Game ID: {gameId} Successfully,",
<<<<<<< HEAD
                    Data = new GameData() { GameId = gameId, Data = gameInitialData },
=======
                    Data = new GameData()
                    {
                        GameId = gameId,
                        Data = gameInitialData
                    }
>>>>>>> origin/main-v2
                };
            }
            else
            {
                return new()
                {
                    StatusCode = HttpStatusCode.InternalServerError,
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
                StatusCode = HttpStatusCode.OK,
                IsSuccess = true,
<<<<<<< HEAD
                Message =
                    $"Successfully retrieved the list of the 10 top players for game {gameId}.",
                Data = topResults,
=======
                Message = $"Successfully retrieved the list of the 10 top players for game {gameId}.",
                Data = topResults
>>>>>>> origin/main-v2
            };
        }

        #region Private Methods

        private async Task<string?> GetGameNameByIdAsync(int gameId)
        {
            return await _gameRepository.GetGameNameByIdAsync(gameId);
        }

        private async Task<GameResult> AddGameResultAsync(GameResult gameResult)
        {
            return await _gameResultRepository.AddGameResultAsync(gameResult);
        }

<<<<<<< HEAD
        private async Task<IEnumerable<GameResult>> GetTopGameResultsByGameIdAsync(
            int gameId,
            int topCount
        )
=======
        private async Task<IEnumerable<GameResult>> GetTopGameResultsByGameIdAsync(int gameId, int topCount)
>>>>>>> origin/main-v2
        {
            return await _gameResultRepository.GetTopGameResultsByGameIdAsync(gameId, topCount);
        }

        private async Task<int> GetRankByUserId(int gameId, int userId, int topCount)
        {
<<<<<<< HEAD
            List<GameResult> gameResults = (
                await GetTopGameResultsByGameIdAsync(gameId, topCount)
            ).ToList();
=======
            List<GameResult> gameResults = (await GetTopGameResultsByGameIdAsync(gameId, topCount)).ToList();
>>>>>>> origin/main-v2

            int index = gameResults.FindIndex(gameResult => gameResult.UserId == userId);

            return index;
        }

        #endregion
    }
}
