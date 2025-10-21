using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.Entities;

namespace EnglishGamesPlatform.Backend.Models.GameInitialDatas
{
    public class MiniWordleData: GameInitialData    
    {
        public int WordLength { get; set; }
        public string? TargetWord { get; set; }
 
    }
}
