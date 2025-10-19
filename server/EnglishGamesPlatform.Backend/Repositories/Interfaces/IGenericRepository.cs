namespace EnglishGamesPlatform.Backend.Repositories.Interfaces
{
    public interface IGenericRepository<T>
    {
        Task<IEnumerable<T>> GetAllAsync();
    }
}
