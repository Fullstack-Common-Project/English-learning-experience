using EnglishGamesPlatform.Backend.Models.Entities;

namespace EnglishGamesPlatform.Backend.Repositories.Interfaces
{
    public interface IImageRepository
    {
        Task<List<Image>> GetRandomImagesAsync(int count);

        Task<Image?> GetByIdAsync(int id);

    }
}
