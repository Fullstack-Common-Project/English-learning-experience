using EnglishGamesPlatform.Backend.Models.DTOs;

namespace EnglishGamesPlatform.Backend.Models.GameInitialDatas
{
    public class PicPickData : GameInitialData
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; }
        public string[] Sentences { get; set; }
        public int correctIndex { get; set; }

    }
}
