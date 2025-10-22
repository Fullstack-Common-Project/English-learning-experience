using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.Entities;

namespace EnglishGamesPlatform.Backend.Models.GameInitialDatas
{
    public class LetterChaosData : GameInitialData
    {
        public List<ModelLetterChaos> Words { get; set; } = new();
    }

    public class ModelLetterChaos
    {
        public int Id { get; set; }
        public string Scrambled { get; set; } = string.Empty;
        public string CorrectWord { get; set; } = string.Empty;
    }
}