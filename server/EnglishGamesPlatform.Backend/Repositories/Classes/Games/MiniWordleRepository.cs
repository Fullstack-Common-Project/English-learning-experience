using EnglishGamesPlatform.Backend.Models;
using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.GameInitialDatas;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;

namespace EnglishGamesPlatform.Backend.Repositories.Classes.Games
{
    public class MiniWordleRepository : IGeneralGameRepository
    {
    
       
        private readonly WordRepository _wordRepository;
        public MiniWordleRepository(WordRepository wordRepository)
        {
            _wordRepository = wordRepository;
        }

        public string GameName => "Mini Wordle";

        public GameInitialData GetData()
        {
            string targetWord = _wordRepository.GetRandomWordsAsync(1,3,5).ToString()!;
            return new MiniWordleData()
            {
                WordLength = targetWord.Length,
                TargetWord = targetWord
            };
        }

     
    }
}
