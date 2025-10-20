using EnglishGamesPlatform.Backend.Models.Entities;

namespace EnglishGamesPlatform.Backend.Repositories.Interfaces
{
    public interface IWordRepository
    {
        Task<Word?> GetByIdAsync(int id);
        Task<List<Word>> GetRandomWordsAsync(int count);
        Task<List<Word>> GetWordsAsync(int firstWordId,int secondWordId);
    }
}
