using EnglishGamesPlatform.Backend.Data;
using EnglishGamesPlatform.Backend.Models.Entities;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnglishGamesPlatform.Backend.Repositories.Classes.Entities
{
    public class GameRepository : IGameRepository
    {
        private readonly AppDbContext _appDbContext;

        public GameRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<IEnumerable<Game>> GetAllAsync()
        {
            return await _appDbContext.Games.ToListAsync();
        }

        public async Task<Game?> GetByIdAsync(int id)
        {
            return await _appDbContext.Games.FindAsync(id);
        }

        public async Task<string?> GetGameNameByIdAsync(int gameId)
        {
            return await _appDbContext.Games
                .Where(g => g.GameId == gameId)
                .Select(g => g.GameName)
                .FirstOrDefaultAsync();
        }
    }
}
