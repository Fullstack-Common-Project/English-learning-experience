using EnglishGamesPlatform.Backend.Models.DTOs;

namespace EnglishGamesPlatform.Backend.Models.GameInitialDatas
{
    public class DoubleVisionData : GameInitialData
    {
        public List<DoubleVisionItem> Items { get; set; } = new();

        public void AddItem(DoubleVisionItem item)
        {
            Items.Add(item);
        }

        public class DoubleVisionItem
        {
            public string MainWord { get; set; }
            public List<Option> Options { get; set; } = new();
            public int CorrectIndex { get; set; }
        }
        public class Option
        {
            public string ImageUrl { get; set; }
            public string Label { get; set; }
        }
    }
}