using EnglishGamesPlatform.Backend.Data;
using EnglishGamesPlatform.Backend.Models.Entities;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnglishGamesPlatform.Backend.Repositories.Classes
{
    public class ImageRepository :IImageRepository
    {
        private readonly AppDbContext _appDbContext;

        public ImageRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<Image?> GetByIdAsync(int id)
        {
            return await _appDbContext.Images.FindAsync(id);
        }

        public async Task<List<Image>> GetRandomImagesAsync(int count)
        {
            return await _appDbContext.Images
                .OrderBy(i => Guid.NewGuid())
                .Take(count)
                .ToListAsync();
        }

    }
}
