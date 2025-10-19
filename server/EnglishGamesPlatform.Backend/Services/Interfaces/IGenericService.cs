using EnglishGamesPlatform.Backend.Models.DTOs;

namespace EnglishGamesPlatform.Backend.Services.Interfaces
{
    public interface IGenericService<T>
    {
        Task<Response<IEnumerable<T>>> GetAllAsync();
    }
}
