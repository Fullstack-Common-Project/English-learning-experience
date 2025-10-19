using EnglishGamesPlatform.Backend.Models;
using EnglishGamesPlatform.Backend.Models.GameDatas;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;

namespace EnglishGamesPlatform.Backend.Services.Classes
{
    public class PictureHangmanService : IGenericGameService<PictureHangmanData>
    {
        private readonly IPictureHangmanRepository _pictureHangmanRepository;
        public PictureHangmanService(IPictureHangmanRepository pictureHangmanRepository)
        {
            _pictureHangmanRepository = pictureHangmanRepository;
        }

        public async Task<Response<GameData<PictureHangmanData>>> GetGameDataAsync()
        {
            IEnumerable<string> pictureUrls = await _pictureHangmanRepository.GetAll();

            return new Response<GameData<PictureHangmanData>>
            {
                IsSuccess = true,
                StatusCode = StatusCodes.Status200OK,
                Data = new GameData<PictureHangmanData>
                {
                    GameId = 1,
                    Data = new PictureHangmanData
                    {
                        PictureUrls = pictureUrls.ToList(),
                    }
                },
                Message = "Get Initial Data Successfully."
            };
        }

        public async Task<Response<GameData<List<LeaderboardEntry>>>> GetLeaderboardAsync()
        {
            return new Response<GameData<List<LeaderboardEntry>>>
            {
                IsSuccess = true,
                StatusCode = StatusCodes.Status200OK,
                Data = new GameData<List<LeaderboardEntry>>
                {
                    GameId = 1,
                    Data = new ()
                },
                Message = "Get Leaderboard Succesfully."
            };
        }
    }
}
