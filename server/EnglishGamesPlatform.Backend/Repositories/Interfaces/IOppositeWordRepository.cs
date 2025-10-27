using EnglishGamesPlatform.Backend.Models.Entities;

namespace EnglishGamesPlatform.Backend.Repositories.Interfaces
{
    public interface IOppositeWordRepository
    {
        Task<List<OppositeWord>> GetRandomPairsOppositeWordsAsync(int count = 5);
   
    }
}
