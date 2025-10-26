using EnglishGamesPlatform.Backend.Data;
using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.Entities;
using EnglishGamesPlatform.Backend.Models.GameInitialDatas;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnglishGamesPlatform.Backend.Repositories.Classes.Games
{
    public class GuessMaster20Repository : IGeneralGameRepository
    {
        public string GameName => "GuessMaster 20";
        private readonly AppDbContext _db;
        public GuessMaster20Repository(AppDbContext db)
        {
            _db = db;
        }

        public async Task<GameInitialData?> GetData()
        {

            var secretId = await _db.Words
                .OrderBy(x => Guid.NewGuid())
                .Select(x => x.WordId)
                .FirstOrDefaultAsync();
            if (secretId == 0) return null;
            var session = new GuessMasterSession
            {
                Id = Guid.NewGuid(),
                PlayerName = "anonymous",
                SecretWordId = secretId,
                TurnsUsed = 0,
                MaxTurns = 20,
                CandidateWordIdsJson = "[]"


            };
            _db.Set<GuessMasterSession>().Add(session);
            await  _db.SaveChangesAsync();

            var suggestions= await _db.Questions
                .Where(q=>q.IsActive)
                .OrderBy(q=>q.DifficultyRank?? int.MaxValue)
                .ThenBy(q=>q.QuestionId)
                .Select(q=>q.Text)
                .Take(4)
                .ToArrayAsync();
            return new GuessMasterData
            {
                SessionId = session.Id,
                Title = "GuessMaster 20",
                MaxTurns = session.MaxTurns,
                RemainingTurns = session.MaxTurns,
                SuggestedQuestions = suggestions
            };

        }
        

    }
}
