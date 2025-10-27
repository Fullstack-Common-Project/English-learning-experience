using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.Entities;
using EnglishGamesPlatform.Backend.Models.GameInitialDatas;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnglishGamesPlatform.Backend.Repositories.Classes.Games
{
    public class MemoryMatchAntonymsRepository : IGeneralGameRepository
    {
        private readonly IOppositeWordRepository _oppositeWordRepository;

        public MemoryMatchAntonymsRepository(IOppositeWordRepository oppositeWordRepository)
        {
            _oppositeWordRepository = oppositeWordRepository;
        }

        public string GameName => "Memory Match Antonyms";

        public async Task<GameInitialData?> GetData()
        {
            var oppositeWords = await _oppositeWordRepository.GetRandomPairsOppositeWordsAsync(8);

            var pairs = oppositeWords.Select(o => new PairDTO
            {
                WordA = o.FirstWord.WordText,
                WordB = o.SecondWord.WordText
            }).ToList();

            return new MemoryMatchAntonymsData
            {
                Pairs = pairs
            };
        }

    }

}
