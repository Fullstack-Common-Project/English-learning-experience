using EnglishGamesPlatform.Backend.Data;
using EnglishGamesPlatform.Backend.Models.Entities;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnglishGamesPlatform.Backend.Repositories.Classes
{
    public class WordRepository : IWordRepository
    {
        private readonly AppDbContext _appDbContext;

        public WordRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<Word?> GetByIdAsync(int id)
        {
            return await _appDbContext.Words.FindAsync(id);
        }

        public async Task<List<Word>> GetRandomWordsAsync(int count)
        {
            return await _appDbContext.Words
                .OrderBy(i => Guid.NewGuid())
                .Take(count)
                .ToListAsync();
        }

        public Task<List<Word>> GetWordsAsync(int firstWordId, int secondWordId)
        {
            throw new NotImplementedException();
        }
    }
}
