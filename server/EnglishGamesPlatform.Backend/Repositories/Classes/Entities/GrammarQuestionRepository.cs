using EnglishGamesPlatform.Backend.Data;
using EnglishGamesPlatform.Backend.Models.Entities;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnglishGamesPlatform.Backend.Repositories.Classes.Entities
{
    public class GrammarQuestionRepository: IGrammarQuestionRepository
    {
        private readonly AppDbContext _appDbContext;

        public GrammarQuestionRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<List<GrammarQuestion>> GetAllAsync()
        {
            return await _appDbContext.GrammarQuestions
                .Include(q => q.CorrectSentence)
                .Include(q => q.FakeSentences)
                .ToListAsync();
        }
    }
}
