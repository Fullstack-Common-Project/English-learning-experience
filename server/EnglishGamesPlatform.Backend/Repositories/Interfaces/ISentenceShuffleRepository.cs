namespace EnglishGamesPlatform.Backend.Repositories.Interfaces
{
    public interface ISentenceShuffleRepository: IGeneralGameRepository
    {
        Task<IEnumerable<string>> GetSentencesByGameIdAsync(int gameId);
    }
}
