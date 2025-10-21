using EnglishGamesPlatform.Backend.Data;
using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.GameInitialDatas;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnglishGamesPlatform.Backend.Repositories.Classes.Games
{
    public class MemoryMatchSynonymsRepository : IGeneralGameRepository
    {
        private readonly AppDbContext _context;

        public MemoryMatchSynonymsRepository(AppDbContext context)
        {
            _context = context;
        }
        public string GameName => "Memory Match Synonyms";

        public GameInitialData GetData()
        {
            var pairs = _context.MemoryMatchSynonymsPairs
              .Include(p => p.Word)
               .Select(p => new PairDTO
               {
                  WordA = p.Word.WordText,
                   WordB = p.Synonym
               })
                 .ToList();

            return new MemoryMatchSynonymsData()
            {
                Pairs = pairs

            };
        }
    }
}
