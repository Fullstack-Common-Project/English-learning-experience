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
            var lengthsPattern = new[] { 3, 3, 4, 4, 5, 5 };

            /*            foreach (var length in lengthsPattern)
            */
                 
            var wordList = await _wordRepository.GetRandomWordsAsync(5, 3, 5);
            for (int i = 0; i < 5; i++)
            {
                if (wordList.Count > 0)
                {
                    var word = wordList[i];
                    letterChaosWords.Add(new ModelLetterChaos
                    {
                        Id = id,
                        CorrectWord = word.WordText.ToLower(),
                        Scrambled = ShuffleWord(word.WordText.ToLower())
                    });
                    id++;
                }
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
