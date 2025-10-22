using EnglishGamesPlatform.Backend.Models.DTOs;

namespace EnglishGamesPlatform.Backend.Models.GameInitialDatas
{
    public class ContextCluesData:GameInitialData
    {
        public List<ContextCluesModel> contextCluesList { get; set; }=new();
    }

    public class ContextCluesModel
    {
        public int Id { get; set; }
        public string Sentence { get; set; }
        public List<string> Options { get; set; }
        public int CorrectIndex { get; set; }
    }
}
