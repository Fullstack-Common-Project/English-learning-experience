using EnglishGamesPlatform.Backend.Models;

namespace EnglishGamesPlatform.Backend.Repositories.Interfaces
{
    public interface IGeneralGameRepository
    {
        int GameID { get; }
        GameInitialData GetData();
    }
}
