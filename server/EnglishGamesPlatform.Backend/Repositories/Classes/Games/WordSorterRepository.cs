using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.GameInitialDatas;
using EnglishGamesPlatform.Backend.Models.Entities;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;

namespace EnglishGamesPlatform.Backend.Repositories.Classes.Games
{
    public class WordSorterRepository : IGeneralGameRepository
    {
        private readonly IWordRepository _wordRepository;
        private readonly ICategoryRepository _categoryRepository;

        public WordSorterRepository(IWordRepository wordRepository, ICategoryRepository categoryRepository)
        {
            _wordRepository = wordRepository;
            _categoryRepository = categoryRepository;
        }

        public string GameName => "Word Sorter";

        public async Task<GameInitialData> GetData()
        {
            // 1. שולפים מילה אקראית
            var words = await _wordRepository.GetRandomWordsAsync(1);
            var word = words.FirstOrDefault();
            if (word == null)
                throw new Exception("No words found in database");

            // 2. שולפים 3 קטגוריות נוספות אקראיות שאינן הקטגוריה הנכונה
            var otherCategories = (await _categoryRepository.GetRandomCategoriesAsync(10)) // נניח שולפים 10 ובוחרים מתוכם 3
                                  .Where(c => c.CategoryId != word.CategoryId)
                                  .Take(3)
                                  .ToList();

            // 3. יוצרים רשימה של 4 קטגוריות כולל הנכונה ומערבבים
            var allCategories = otherCategories.Append(word.Category)
                                               .OrderBy(x => Guid.NewGuid())
                                               .ToList();

            // 4. מחזירים את הנתונים
            return new WordSorterData
            {
                WordText = word.WordText,
                Categories = allCategories.Select(c => c.CategoryName).ToList(),
                CorrectIndex = allCategories.IndexOf(word.Category)
            };
        }
    }
}
