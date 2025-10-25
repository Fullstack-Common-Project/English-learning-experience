using EnglishGamesPlatform.Backend.Models.DTOs;

namespace EnglishGamesPlatform.Backend.Models.GameDatas
{
    public class PictureHangmanData : GameInitialData
    {
        public List<ImageWordPair> Pairs { get; set; }
    }
}
