using EnglishGamesPlatform.Backend.Models.DTOs;

namespace EnglishGamesPlatform.Backend.Models.GameInitialDatas
{
    public class MemoryMatchSynonymsData : GameInitialData
    {
        public List<PairDTO> Pairs { get; set; } = new();

    }
}
