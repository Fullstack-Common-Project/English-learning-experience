using EnglishGamesPlatform.Backend.Models.DTOs;

namespace EnglishGamesPlatform.Backend.Models.GameInitialDatas
{
    public class OppositeQuestData:GameInitialData
    {
        public List<OppositeQuestItem> Items { get; set; } = new();

        public void AddItem(OppositeQuestItem item)
        {
            Items.Add(item);
        }
    }
    public class OppositeQuestItem
    {
        public int Id { get; set; }
        public string Word { get; set; } = string.Empty;
        public string[] Options { get; set; } = Array.Empty<string>();
        public int CorrectIndex { get; set; }
    }
}
