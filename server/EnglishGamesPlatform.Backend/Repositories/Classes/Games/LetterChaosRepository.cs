using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.Entities;
using EnglishGamesPlatform.Backend.Models.GameInitialDatas;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;

namespace EnglishGamesPlatform.Backend.Repositories.Classes.Games
{
    public class LetterChaosRepository : IGeneralGameRepository
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
            var wordList = await _wordRepository.GetRandomWordsAsync(5, 3, 5);

            for (int i = 0; i < wordList.Count; i++)
            {
                var word = wordList[i];
                letterChaosWords.Add(new ModelLetterChaos
                {
                    Id = i + 1,
                    CorrectWord = word.WordText.ToLower(),
                    Scrambled = ShuffleWord(word.WordText.ToLower())
                });
            }

            return new LetterChaosData
            {
                Words = letterChaosWords
            };
        }

        private string ShuffleWord(string word)
        {
            if (string.IsNullOrEmpty(word))
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
