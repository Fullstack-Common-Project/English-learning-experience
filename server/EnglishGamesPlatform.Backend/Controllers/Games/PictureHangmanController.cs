using EnglishGamesPlatform.Backend.Models.GameDatas;
using EnglishGamesPlatform.Backend.Services;
using EnglishGamesPlatform.Backend.Services.Classes;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EnglishGamesPlatform.Backend.Controllers.Games
{
    [Route("api/[controller]")]
    [ApiController]
    public class PictureHangmanController : GameControllerBase<PictureHangmanData, IGameService<PictureHangmanData>>
    {
        public PictureHangmanController(IGameService<PictureHangmanData> gameService) : base(gameService)
        {
        }
    }
}
