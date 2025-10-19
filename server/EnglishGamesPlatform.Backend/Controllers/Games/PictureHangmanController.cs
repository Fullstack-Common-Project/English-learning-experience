using EnglishGamesPlatform.Backend.Models.GameDatas;
using EnglishGamesPlatform.Backend.Services;
using EnglishGamesPlatform.Backend.Services.Classes;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EnglishGamesPlatform.Backend.Controllers.Games
{
    [Route("api/[controller]")]
    [ApiController]
    public class PictureHangmanController : GameControllerBase<PictureHangmanData, IGenericGameService<PictureHangmanData>>
    {
        public PictureHangmanController(IGenericGameService<PictureHangmanData> gameService) : base(gameService)
        {
        }
    }
}
