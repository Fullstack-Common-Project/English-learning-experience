using EnglishGamesPlatform.Backend.Models.Entities;

namespace EnglishGamesPlatform.Backend.Repositories.Interfaces
{
    public interface IGrammarQuestionRepository
    {
        Task<List<GrammarQuestion>> GetAllAsync();
    }
}
