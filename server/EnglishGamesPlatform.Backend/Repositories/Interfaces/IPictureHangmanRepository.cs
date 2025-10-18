namespace EnglishGamesPlatform.Backend.Repositories.Interfaces
{
    public interface IPictureHangmanRepository
    {
        Task<IEnumerable<string>> GetAll();
    }
}
