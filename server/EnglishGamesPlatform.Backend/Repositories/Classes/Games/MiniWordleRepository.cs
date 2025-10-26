using EnglishGamesPlatform.Backend.Models;
using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.GameInitialDatas;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;

namespace EnglishGamesPlatform.Backend.Repositories.Classes.Games
{
    public class MiniWordleRepository : IGeneralGameRepository
    {
    
       
        private readonly IWordRepository _wordRepository;


        private static int counter = 1;

        public MiniWordleRepository(IWordRepository wordRepository)
        {
            _wordRepository = wordRepository;
        }

        public string GameName => "Mini Wordle";


        public async Task<GameInitialData> GetData()
        {
            var words = await _wordRepository.GetRandomWordsAsync(1, 3, 5);
            var targetWord = words.First().WordText; 

            var res= new MiniWordleData
            {


                Id=counter++,
                WordLength = targetWord.Length,
                TargetWord = targetWord
            };
            return res;
        }


      




    }
}
