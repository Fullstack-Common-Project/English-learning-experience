using EnglishGamesPlatform.Backend.Data;
using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.GameInitialDatas;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace EnglishGamesPlatform.Backend.Repositories.Classes.Games
{
    public class MemoryMatchSynonymsRepository : IGeneralGameRepository
    {
        private readonly AppDbContext _context;

        public MemoryMatchSynonymsRepository(AppDbContext context)
        {
            _context = context;
        }

        public string GameName => "Memory Match: Synonyms";

        public async Task<GameInitialData?> GetData()
        {
            var pairs = await _context.MemoryMatchSynonymsPairs
                .Include(p => p.Word)
                .Select(p => new SynonymPair
                {
                    Word = p.Word.WordText,
                    Synonym = p.Synonym
                })
                .ToListAsync();

            return new MemoryMatchSynonymsData { Pairs = pairs };
        }
    }
}
