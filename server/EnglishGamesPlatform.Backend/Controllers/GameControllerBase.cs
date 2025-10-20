using EnglishGamesPlatform.Backend.Models;
using EnglishGamesPlatform.Backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EnglishGamesPlatform.Backend.Controllers
{
    [Route("api/v1")]
    [ApiController]
    public abstract class GameControllerBase<T, V> : ControllerBase where V : IGenericGameService<T>
    {
        private readonly V _gameService;

        public GameControllerBase(V gameService)
        {
            _gameService = gameService;
        }

        [HttpGet("data")]
        public async Task<ActionResult<Response<GameData<T>>>> GetGameData()
        {
            Response<GameData<T>> response = await _gameService.GetGameDataAsync();
            if (response.IsSuccess)
                return Ok(response);
            else
                return StatusCode((int)response.StatusCode, response);
        }

        [HttpGet("leaderboard")]
        public async Task<ActionResult<Response<GameData<List<LeaderboardEntry>>>>> GetLeaderboardAsync()
        {
            Response<GameData<List<LeaderboardEntry>>> response = await _gameService.GetLeaderboardAsync();
            if (response.IsSuccess)
                return Ok(response);
            else
                return StatusCode((int)response.StatusCode, response);
        }
    }
}
