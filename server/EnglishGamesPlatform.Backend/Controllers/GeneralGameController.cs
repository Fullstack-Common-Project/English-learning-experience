using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.DTOs.Entities_DTOs;
using EnglishGamesPlatform.Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EnglishGamesPlatform.Backend.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    //[Authorize] 
    public class GeneralGameController : ControllerBase
    {
        private readonly IGeneralGameService _gameService;

        public GeneralGameController(IGeneralGameService gameService)
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

        [HttpPost("{gameId}/progress")]
        public async Task<ActionResult<Response<FinalGameStatus>>> GetFinalGameStatusAsync([FromBody] GameResultDTO gameResultDTO)
        {
            Response<FinalGameStatus> response = await _gameService.GetFinalGameStatusAndAddGameResultAsync(gameResultDTO);
            if (response.IsSuccess)
                return Ok(response);
            else
                return StatusCode((int)response.StatusCode, response);
        }

    }
}
