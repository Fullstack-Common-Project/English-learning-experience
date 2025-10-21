using EnglishGamesPlatform.Backend.Models.Entities;

namespace EnglishGamesPlatform.Backend.Repositories.Interfaces
{
    public interface ITwinWordRepository
    {
        Task<List<TwinWord>> GetRandomPairsTwinWordsAsync(int count = 5);
    }
}
