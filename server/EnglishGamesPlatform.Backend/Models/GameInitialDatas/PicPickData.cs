using EnglishGamesPlatform.Backend.Models.DTOs;

namespace EnglishGamesPlatform.Backend.Models.GameInitialDatas
{
    public class PicPickItem
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; }
        public string[] Sentences { get; set; }
        public int correctIndex { get; set; }
    }

    public class PicPickData : GameInitialData
    {
     public List<PicPickItem> Items { get; set; } = new List<PicPickItem>();
    }
}


