using EnglishGamesPlatform.Backend.Data;
using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EnglishGamesPlatform.Backend.Controllers.Games
{
    [ApiController]
    [Route("api/v1/games/guessmaster-20")]
    public class GuessMaster20Controller: ControllerBase
    {
        private readonly AppDbContext _db;
        public GuessMaster20Controller(AppDbContext db)
        {
            _db = db;
        }
        [HttpPost("ask")]
        
        public async Task<ActionResult<GuessMasterAskResponse>> Ask([FromBody] GuessMasterAskRequest req)
        {
            var session = await _db.Set<GuessMasterSession>()
                .FindAsync(req.SessionId);
            if (session == null)
            {
                return NotFound("Session not found");
            }
           
            var secretWordText = await _db.Words
                    .Where(w => w.WordId == session.SecretWordId)
                    .Select(w => w.WordText)
                    .FirstOrDefaultAsync();
            if (secretWordText == null)
            {
                return NotFound("Secret word not found");
            }
            if (req.IsGuess)
            {
                if (string.IsNullOrWhiteSpace(req.GuessWord))
                {
                    return BadRequest("Guess word is required for a guess.");
                }
                var correct= string.Equals(req.GuessWord.Trim(), secretWordText, StringComparison.OrdinalIgnoreCase);
                session.TurnsUsed++;
                await _db.SaveChangesAsync();
                return Ok(new GuessMasterAskResponse
                {
                    SessionId = session.Id,
                    YesNoAnswer = null,
                    GuessCorrect = correct,
                    GameOver = true,
                    Won = correct,
                    RemainingTurns = Math.Max(0, session.MaxTurns-session.TurnsUsed),
                    NextSuggestedQuestions = Array.Empty<string>()
                });
            }


            if (session.TurnsUsed >= session.MaxTurns)
            {
                return Ok(new GuessMasterAskResponse
                {
                    SessionId = session.Id,
                    GameOver = true,
                    Won = false,
                    RemainingTurns = 0,
                    NextSuggestedQuestions= Array.Empty<string>()
                });
            }
            int? qId = req.QuestionId;
            if (qId == null && !string.IsNullOrWhiteSpace(req.QuestionText))
            {
                qId = await _db.Questions
                    .Where(q => q.IsActive && q.Text == req.QuestionText)
                    .Select(q => (int?)q.QuestionId)
                    .FirstOrDefaultAsync();
            }
            if (qId == null)
                return BadRequest("Question not found");
            var yes=await _db.WordQuestionAnswers
                .Where(a=>a.WordId==session.SecretWordId && a.QuestionId==qId.Value)
                .Select(a=>(bool?)a.AnswerYes)
                .FirstOrDefaultAsync();
            session.TurnsUsed++;
            await _db.SaveChangesAsync();

            var remaining = Math.Max(0, session.MaxTurns - session.TurnsUsed);
            var gameOver = remaining == 0;
            var nextQuestions = await _db.Questions
                .Where(q => q.IsActive)
                .OrderBy(q => q.DifficultyRank ?? int.MaxValue)
                .ThenBy(q => q.QuestionId)
                .Take(4)
                .Select(q => q.Text)
                .ToArrayAsync();
            return Ok(new GuessMasterAskResponse
            {
                SessionId = session.Id,
                YesNoAnswer = yes ?? false,
                GuessCorrect = null,
                RemainingTurns = remaining,
                GameOver = gameOver,
                Won = gameOver ? false : (bool?)null,
                NextSuggestedQuestions = nextQuestions
            });
            return Ok(Response);
        }
    }
}
