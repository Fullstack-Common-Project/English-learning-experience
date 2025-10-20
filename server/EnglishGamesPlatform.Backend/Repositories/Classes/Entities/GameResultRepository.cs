using EnglishGamesPlatform.Backend.Data;
using EnglishGamesPlatform.Backend.Models;
using EnglishGamesPlatform.Backend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace EnglishGamesPlatform.Backend.Repositories.Classes.Entities
{
    public class GameResultRepository
    {
        private readonly AppDbContext _appDbContext;

        public GameResultRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<LeaderboardData> GetTop10ByGameAsync(int gameId)
        {
            var topResults= await _appDbContext.GameResults
            .Where(p => p.GameId == gameId)
            .Include(p => p.User)
            .OrderByDescending(p => p.Score)
            .ThenBy(p => p.Time)
            .Take(10)
            .ToListAsync();

            var leaderboardEntries = topResults
               .Select((r, index) => new LeaderboardEntry
               {
                   Rank = index + 1,         
                   UserName = r.User.FullName, 
                   Score = r.Score,
                   Time = r.Time
               })
               .ToList();

            return new LeaderboardData
            {
                GameId = gameId,
                Leaderboards = leaderboardEntries
            };
        }
    }
}
