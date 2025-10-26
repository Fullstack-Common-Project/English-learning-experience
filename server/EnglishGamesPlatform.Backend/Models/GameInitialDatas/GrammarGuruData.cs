using EnglishGamesPlatform.Backend.Models.DTOs;

namespace EnglishGamesPlatform.Backend.Models.GameInitialDatas
{
    public class GrammarGuruData 
    {
        public string[] Sentences { get; set; } = [];
        public int CorrectIndex { get; set; }
    };
    public class GrammarGuruDataList : GameInitialData

    {
        public List<GrammarGuruData> Data { get; set; } = [];
    }
}
