using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.DTOs.Entities_DTOs;
using EnglishGamesPlatform.Backend.Services.Interfaces;
<<<<<<< HEAD
using Microsoft.AspNetCore.Authorization;
=======

using Microsoft.AspNetCore.Authorization;

>>>>>>> origin/main-v2
using Microsoft.AspNetCore.Mvc;

namespace EnglishGamesPlatform.Backend.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
<<<<<<< HEAD
 
=======

>>>>>>> origin/main-v2
    public class GameController : ControllerBase
    {
        private readonly IGameService _gameService;

        public GameController(IGameService gameService)
        {
            _gameService = gameService;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<Response<IEnumerable<GameDTO>>>> GetAllAsync()
        {
            Response<IEnumerable<GameDTO>> response = await _gameService.GetAllAsync();
            if (response.IsSuccess)
                return Ok(response);
            else
                return StatusCode((int)response.StatusCode, response);
        }
    }
}
