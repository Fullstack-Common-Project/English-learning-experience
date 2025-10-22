using EnglishGamesPlatform.Backend.Data;
using EnglishGamesPlatform.Backend.Models.Entities;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnglishGamesPlatform.Backend.Repositories.Classes
{
    public class FakeSentenceRepository : IFakeSentenceRepository
    {
        private readonly AppDbContext _appDbContext;

        public FakeSentenceRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<List<GrammarQuestionFakeSentence>> GetByQuestionIdAsync(int questionId)
        {
            return await _appDbContext.GrammarQuestionFakeSentences
                .Where(fs => fs.GrammarQuestionId == questionId)
                .ToListAsync();
        }
    }
}
