using EnglishGamesPlatform.Backend.Models;

namespace EnglishGamesPlatform.Backend.Services
{
    public interface IGameService<T>
    {
        Task<Response<GameData<T>>> GetGameDataAsync();
        

    }
}
