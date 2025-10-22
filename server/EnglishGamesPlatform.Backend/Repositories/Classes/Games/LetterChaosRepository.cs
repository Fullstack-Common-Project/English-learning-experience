using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.Entities;
using EnglishGamesPlatform.Backend.Models.GameInitialDatas;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;

namespace EnglishGamesPlatform.Backend.Repositories.Classes.Games
{
    public class LetterChaosRepository: IGeneralGameRepository
    {
        public string GameName => "Letter Chaos";

        private readonly IWordRepository _wordRepository;

        public LetterChaosRepository(IWordRepository wordRepository)
        {
            _wordRepository = wordRepository;
        }

        public async Task<GameInitialData> GetData()
        {
            var letterChaosWords = new List<ModelLetterChaos>();
            int id = 1;

            var words = await _wordRepository.GetRandomWordsAsync(5);

            foreach (var word in words)
            {
                letterChaosWords.Add(new ModelLetterChaos
                {
                    Id = id,
                    CorrectWord = word.WordText,
                    Scrambled = ShuffleWord(word.WordText)
                });
                id++;
            }

             return new LetterChaosData
             {
                Words = letterChaosWords
             };
        }

        private string ShuffleWord(string word)
        {
            if (string.IsNullOrEmpty(word) || word.Length < 2)
                return word;

            var scrambled = new string(word.ToCharArray()
                   .OrderBy(c => Guid.NewGuid())
                   .ToArray());

            if (scrambled.Equals(word))
                return ShuffleWord(word);

            return scrambled;
        }
    }
}
