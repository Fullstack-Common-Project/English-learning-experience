using EnglishGamesPlatform.Backend.Models;
using EnglishGamesPlatform.Backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EnglishGamesPlatform.Backend.Controllers
{
    [Route("api/v1")]
    [ApiController]
    public class GameControllerBase : ControllerBase
    {
        private readonly IGeneralGameService _gameService;

        public GameControllerBase(IGeneralGameService gameService)
        {
            _gameService = gameService;
        }

        [HttpGet("{gameId}/data")]
        public async Task<ActionResult<Response<GameData>>> GetGameData(int gameId)
        {
            Response<GameData> response = await _gameService.GetGameDataAsync(gameId);
            if (response.IsSuccess)
                return Ok(response);
            else
                return StatusCode((int)response.StatusCode, response);
        }

        [HttpGet("{gameId}/leaderboard")]
        public async Task<ActionResult<Response<LeaderboardData>>> GetLeaderboardAsync(int gameId)
        {
            Response<LeaderboardData> response = await _gameService.GetLeaderboardAsync(gameId);
            if (response.IsSuccess)
                return Ok(response);
            else
                return StatusCode((int)response.StatusCode, response);
        }

    }
}
