using EnglishGamesPlatform.Backend.Models.DTOs;

namespace EnglishGamesPlatform.Backend.Models.GameInitialDatas
{
    public class RhymeTimeData : GameInitialData
    {
        // The word that needs to be rhymed with
        public string Word { get; set; } = string.Empty;

        // Suggested word list
        public List<string> Options { get; set; } = new();

        // Indexes of the correct words
        public List<int> CorrectIndices { get; set; } = new();
    }
}
