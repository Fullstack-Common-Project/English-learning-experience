using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.Entities;

namespace EnglishGamesPlatform.Backend.Models.GameInitialDatas
{
    public class WordSorterData : GameInitialData
    {
        public string WordText { get; set; } = string.Empty;  // המילה שתוצג
        public List<string> Categories { get; set; } = new List<string>();  // ארבע קטגוריות כולל הנכונה
        public int CorrectIndex { get; set; }  // מיקום התשובה הנכונה ברשימת הקטגוריות
    }
}
