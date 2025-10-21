using EnglishGamesPlatform.Backend.Models;
using EnglishGamesPlatform.Backend.Models.DTOs;

namespace EnglishGamesPlatform.Backend.Repositories.Interfaces
{
    public interface IGeneralGameRepository
    {
        string GameName { get; }
<<<<<<< HEAD

        Task<GameInitialData?> GetData();
=======
        Task<GameInitialData> GetData();
>>>>>>> origin/main
    }
}
