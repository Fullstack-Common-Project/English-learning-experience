using EnglishGamesPlatform.Backend.Data;
using EnglishGamesPlatform.Backend.Models.Entities;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnglishGamesPlatform.Backend.Repositories.Classes.Entities
{
    public class OppositeWordRepository: IOppositeWordRepository
    {
        private readonly AppDbContext _appDbContext;

        public OppositeWordRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<List<OppositeWord>> GetRandomPairsOppositeWordsAsync(int count=5)
        {
           return await _appDbContext.OppositeWords
               .Include(o => o.FirstWord)
               .Include(o => o.SecondWord)
               .OrderBy(w => EF.Functions.Random())
               .Take(count) 
               .ToListAsync();
        }
        public async Task<List<OppositeWord>> GetAllOppositeWordsAsync()
        {
            return await _appDbContext.OppositeWords.Include(o => o.FirstWord).Include(o => o.SecondWord).ToListAsync();
        }

    }
}
