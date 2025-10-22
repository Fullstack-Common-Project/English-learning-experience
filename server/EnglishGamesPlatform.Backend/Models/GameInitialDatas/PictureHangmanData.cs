using EnglishGamesPlatform.Backend.Models.DTOs;

namespace EnglishGamesPlatform.Backend.Models.GameDatas
{
    public class PictureHangmanData : GameInitialData
    {
        public string TargetWord { get; set; }

        public string ImageUrl { get; set; }
    }
}
