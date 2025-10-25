using System.Collections.Generic;
using EnglishGamesPlatform.Backend.Models.DTOs;

namespace EnglishGamesPlatform.Backend.Models.GameInitialDatas
{
    public class MemoryMatchAntonymsData : GameInitialData
    {
        public List<PairDTO> Pairs { get; set; } = new();
    }
}
