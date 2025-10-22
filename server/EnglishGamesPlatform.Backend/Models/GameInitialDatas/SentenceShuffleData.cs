using EnglishGamesPlatform.Backend.Models.DTOs;

namespace EnglishGamesPlatform.Backend.Models.GameInitialDatas
{
    public class SentenceShuffleData:GameInitialData
    {
        public required string CorrectSentence { get; set; }
        public List<string> Words { get; set; } = new();

    }
}
