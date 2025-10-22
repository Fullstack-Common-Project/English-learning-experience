using EnglishGamesPlatform.Backend.Data;
using EnglishGamesPlatform.Backend.Models.Entities;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace EnglishGamesPlatform.Backend.Repositories.Classes.Entities
{
    public class TwinWordRepository : ITwinWordRepository
    {
        private readonly AppDbContext _context;

        public TwinWordRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<TwinWord>> GetRandomPairsTwinWordsAsync(int count = 5)
        {
            return await _context.TwinWords
                .Include(t => t.BaseWord)
                .Include(t => t.SynonymWord)
                .OrderBy(x => Guid.NewGuid())
                .Take(count)
                .ToListAsync();
        }
    }
}
