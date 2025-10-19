using EnglishGamesPlatform.Backend.Models;

namespace EnglishGamesPlatform.Backend.Services.Interfaces
{
    public interface IGenericService<T>
    {
        Task<Response<IEnumerable<T>>> GetAllAsync();
    }
}
