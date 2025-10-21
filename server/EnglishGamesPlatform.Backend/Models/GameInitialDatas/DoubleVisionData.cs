using EnglishGamesPlatform.Backend.Models.DTOs;

namespace EnglishGamesPlatform.Backend.Models.GameInitialDatas
{
    public class DoubleVisionData:GameInitialData
    {
        public string MainWord { get; set; }
        public List<Option> Options { get; set; }
        public int CorrectIndex { get; set; }

        public class Option
        {
            public string ImageUrl { get; set; }
            public string Label { get; set; }
        }
    }
}
