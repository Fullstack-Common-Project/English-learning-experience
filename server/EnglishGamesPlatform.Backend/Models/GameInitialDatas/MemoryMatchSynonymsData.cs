using System.Collections.Generic;
using EnglishGamesPlatform.Backend.Models.DTOs;

namespace EnglishGamesPlatform.Backend.Models.GameInitialDatas
{
    public class MemoryMatchSynonymsData : GameInitialData
    {
        public List<SynonymPair> Pairs { get; set; } = new();
    }

    public class SynonymPair
    {
        public string Word { get; set; } = null!;
        public string Synonym { get; set; } = null!;
    }
}
