using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EnglishGamesPlatform.Backend.Data;
using EnglishGamesPlatform.Backend.Models.Entities;
using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.GameInitialDatas;

namespace EnglishGamesPlatform.Backend.Controllers.Games
{

    [ApiController]
    [Route("api/v1/games/guessmaster-20")]
    public class GuessMaster20Controller : ControllerBase
    {
        private readonly AppDbContext _db;
        private const int DEFAULT_MAX_TURNS = 20;
        private const int MIN_COVERAGE = 5;

        private static readonly HashSet<string> AllowedWordTextsLower = new(StringComparer.OrdinalIgnoreCase)
        {
            "apple","banana","orange",
            "dog","cat","horse",
            "car","bus","train","bicycle","airplane",
            "computer","phone","television","camera","lamp",
            "book","pencil",
            "chair","table","house","sofa",
            "ball","guitar",
            "tree","flower",
            "shirt","shoes",
            "cup","knife"
        };
        // בתוך אותו namespace והקובץ של GuessMaster20Controller

        public class RefreshSuggestionsRequest
        {
            public Guid SessionId { get; set; }
            public List<string>? Exclude { get; set; } = new();
        }

        public class RefreshSuggestionsResponse
        {
            public Guid SessionId { get; set; }
            public string[] SuggestedQuestions { get; set; } = Array.Empty<string>();
        }

        [HttpPost("suggestions/refresh")]
        public async Task<ActionResult<RefreshSuggestionsResponse>> RefreshSuggestions([FromBody] RefreshSuggestionsRequest req)
        {
            var session = await _db.Set<GuessMasterSession>().FindAsync(req.SessionId);
            if (session == null) return NotFound("Session not found");

            // קח את מאגר המועמדים מהסשן; אם ריק – בנה מאגר כמו בזרימה הקיימת
            var candidateIds = ReadCandidates(session);
            if (candidateIds.Count == 0)
            {
                candidateIds = await QueryPoolAsync();
                if (candidateIds.Count == 0)
                {
                    candidateIds = await _db.Set<WordQuestionAnswerEntity>()
                                            .Select(a => a.WordId)
                                            .Distinct()
                                            .ToListAsync();
                }
                WriteCandidates(session, candidateIds);
                await _db.SaveChangesAsync();
            }

            // הבא את כל המועמדים ל"שאלות טובות" בדיוק כמו בפונקציה הקיימת,
            // ואז סנן החוצה את מה שהלקוח ביקש לא לכלול, ובמידת הצורך מלא עד 4.
            var allFresh = await SuggestQuestionsAsync(candidateIds, excludeQuestionId: null, excludeQuestionText: null);

            var excludeSet = new HashSet<string>(
                (req.Exclude ?? new()).Select(NormalizeQuestionText),
                StringComparer.OrdinalIgnoreCase
            );

            var alt = allFresh
                .Where(q => !excludeSet.Contains(NormalizeQuestionText(q)))
                .Take(4)
                .ToList();

            if (alt.Count < 4)
            {
                // אם קיבלנו פחות מ-4 (למשל כי הרשימה חוזרת על עצמה), ננסה להביא עוד “ממלאי מקום”
                var allQs = await _db.Set<Question>()
                                     .Where(q => q.IsActive)
                                     .Select(q => q.Text)
                                     .ToListAsync();

                foreach (var q in allQs)
                {
                    if (alt.Count >= 4) break;
                    if (excludeSet.Contains(NormalizeQuestionText(q))) continue;
                    if (!alt.Contains(q)) alt.Add(q);
                }
            }

            return Ok(new RefreshSuggestionsResponse
            {
                SessionId = session.Id,
                SuggestedQuestions = alt.Distinct().Take(4).ToArray()
            });
        }

        public GuessMaster20Controller(AppDbContext db) => _db = db;

        [HttpGet("data")]
        public async Task<ActionResult<GuessMasterData>> GetInitialData()
        {
            var pool = await QueryPoolAsync();

            if (pool.Count == 0)
                pool = await _db.Set<WordQuestionAnswerEntity>()
                                .Select(a => a.WordId)
                                .Distinct()
                                .ToListAsync();

            if (pool.Count == 0)
                return Ok(new GuessMasterData
                {
                    SessionId = Guid.Empty,
                    Title = "GuessMaster 20",
                    MaxTurns = DEFAULT_MAX_TURNS,
                    RemainingTurns = DEFAULT_MAX_TURNS,
                    SuggestedQuestions = Array.Empty<string>()
                });

            var secretWordId = pool[Random.Shared.Next(pool.Count)];

            var session = new GuessMasterSession
            {
                PlayerName = "anonymous",
                SecretWordId = secretWordId,
                MaxTurns = DEFAULT_MAX_TURNS,
                TurnsUsed = 0,
                CandidateWordIdsJson = JsonSerializer.Serialize(pool)
            };

            _db.Set<GuessMasterSession>().Add(session);
            await _db.SaveChangesAsync();

            var suggested = await SuggestQuestionsAsync(pool, null, null);

            return Ok(new GuessMasterData
            {
                SessionId = session.Id,
                Title = "GuessMaster 20",
                MaxTurns = session.MaxTurns,
                RemainingTurns = session.MaxTurns,
                SuggestedQuestions = suggested
            });
        }

        [HttpPost("ask")]
        public async Task<ActionResult<GuessMasterAskResponse>> Ask([FromBody] GuessMasterAskRequest req)
        {
            var session = await _db.Set<GuessMasterSession>().FindAsync(req.SessionId);
            if (session == null) return NotFound("Session not found");

            var secretWordText = await _db.Set<Word>()
                .Where(w => w.WordId == session.SecretWordId)
                .Select(w => w.WordText)
                .FirstOrDefaultAsync();
            if (secretWordText == null) return NotFound("Secret word not found");

            if (session.TurnsUsed >= session.MaxTurns)
                return Ok(new GuessMasterAskResponse
                {
                    SessionId = session.Id,
                    GameOver = true,
                    Won = false,
                    RemainingTurns = 0
                });

            if (req.IsGuess)
            {
                var correct = string.Equals(req.GuessWord?.Trim(), secretWordText, StringComparison.OrdinalIgnoreCase);
                session.TurnsUsed++;
                await _db.SaveChangesAsync();

                return Ok(new GuessMasterAskResponse
                {
                    SessionId = session.Id,
                    GuessCorrect = correct,
                    GameOver = true,
                    Won = correct,
                    RemainingTurns = Math.Max(0, session.MaxTurns - session.TurnsUsed)
                });
            }

            var candidateIds = ReadCandidates(session);
            if (candidateIds.Count == 0)
            {
                candidateIds = await QueryPoolAsync();
                if (candidateIds.Count == 0)
                    candidateIds = await _db.Set<WordQuestionAnswerEntity>()
                                            .Select(a => a.WordId)
                                            .Distinct()
                                            .ToListAsync();
                WriteCandidates(session, candidateIds);
            }

            int? qId = req.QuestionId;
            if (qId <= 0 && !string.IsNullOrWhiteSpace(req.QuestionText))
            {
                var norm = req.QuestionText.Trim().ToLower();
                qId = await _db.Set<Question>()
                    .Where(q => q.IsActive && q.Text.ToLower() == norm)
                    .Select(q => (int?)q.QuestionId)
                    .FirstOrDefaultAsync();
            }
            if (qId == null) return BadRequest("Question not found");

            bool? yes = await _db.Set<WordQuestionAnswerEntity>()
                .Where(a => a.WordId == session.SecretWordId && a.QuestionId == qId)
                .Select(a => (bool?)a.AnswerYes)
                .FirstOrDefaultAsync();

            if (yes.HasValue)
            {
                candidateIds = await _db.Set<WordQuestionAnswerEntity>()
                    .Where(a => candidateIds.Contains(a.WordId) && a.QuestionId == qId && a.AnswerYes == yes)
                    .Select(a => a.WordId)
                    .Distinct()
                    .ToListAsync();

                WriteCandidates(session, candidateIds);
            }

            session.TurnsUsed++;
            await _db.SaveChangesAsync();

            var nextQuestions = await SuggestQuestionsAsync(candidateIds, qId, req.QuestionText);

            return Ok(new GuessMasterAskResponse
            {
                SessionId = session.Id,
                YesNoAnswer = yes,
                RemainingTurns = Math.Max(0, session.MaxTurns - session.TurnsUsed),
                GameOver = session.TurnsUsed >= session.MaxTurns,
                NextSuggestedQuestions = nextQuestions
            });
        }

        private async Task<List<int>> QueryPoolAsync()
        {
            var q = from w in _db.Set<Word>()
                    where AllowedWordTextsLower.Contains(w.WordText.ToLower())
                    where _db.Set<WordQuestionAnswerEntity>().Any(a => a.WordId == w.WordId)
                    select w.WordId;

            return await q.Distinct().ToListAsync();
        }
        private async Task<string[]> SuggestQuestionsAsync(
    List<int> candidateIds,
    int? excludeQuestionId,
    string? excludeQuestionText = null)
        {
            // 1) ברירת מועמדים (תמיד רק ה-30, ואז fallback)
            if (candidateIds.Count == 0)
            {
                candidateIds = await QueryPoolAsync();
                if (candidateIds.Count == 0)
                {
                    candidateIds = await _db.Set<WordQuestionAnswerEntity>()
                                            .Select(a => a.WordId)
                                            .Distinct()
                                            .ToListAsync();
                }
            }

            // 2) מביאים את כל השאלות הפעילות (בזיכרון), ואז סטטיסטיקה בפעם אחת מה-DB
            var allQs = await _db.Set<Question>()
                                 .Where(q => q.IsActive)
                                 .Select(q => new { q.QuestionId, q.Text, q.DifficultyRank })
                                 .ToListAsync();

            // לא מציעים את השאלה האחרונה / טקסט זהה
            var exId = excludeQuestionId ?? -1;
            var exTextNorm = NormalizeQuestionText(excludeQuestionText);

            // GROUP BY אחת: Total ו-Yes לכל QuestionId מול קבוצת המועמדים
            var agg = await _db.Set<WordQuestionAnswerEntity>()
                               .Where(a => candidateIds.Contains(a.WordId))
                               .GroupBy(a => a.QuestionId)
                               .Select(g => new
                               {
                                   QuestionId = g.Key,
                                   Total = g.Count(),
                                   YesCount = g.Sum(a => a.AnswerYes ? 1 : 0)
                               })
                               .ToListAsync();

            // מיפוי מהיר לשימוש פנימי
            var statsByQ = agg.ToDictionary(x => x.QuestionId);

            // פונקציות עזר
            static double P(int yes, int total) => total == 0 ? 0.0 : yes / (double)total;
            static double InfoScore(int yes, int total)
                => total * (1 - Math.Abs(2 * P(yes, total) - 1)); // גבוה=טוב (קרוב ל-50/50)

            // 3) מסקנות־על מהקבוצה (בזיכרון, בלי LINQ ל-SQL)
            string N(string? s) => NormalizeQuestionText(s);

            var textById = allQs.ToDictionary(q => q.QuestionId, q => q.Text);
            string T(int id) => textById.TryGetValue(id, out var t) ? t : "";

            bool GetAlways(string key, bool yesWanted)
            {
                var q = allQs.FirstOrDefault(x => N(x.Text) == key);
                if (q == null) return false;
                if (!statsByQ.TryGetValue(q.QuestionId, out var st)) return false;
                return yesWanted ? st.YesCount == st.Total : st.YesCount == 0;
            }

            // דוגמאות “על” נפוצות:
            bool livingAlwaysFalse = GetAlways("isit alivingthing", false);
            bool livingAlwaysTrue = GetAlways("isit alivingthing", true);
            bool objectAlwaysFalse = GetAlways("isit anobject", false);
            bool objectAlwaysTrue = GetAlways("isit anobject", true);
            bool manmadeAlwaysTrue = GetAlways("isit manmade", true);
            bool manmadeAlwaysFalse = GetAlways("isit manmade", false);

            bool FamilyAnimal(string t)
            {
                t = N(t);
                return t is "isit ananimal" or "doesit havelegs" or "doesit havewings" or "doesit atail" or "doesit usuallymove" or "doesit makenoise";
            }
            bool FamilyPlant(string t)
            {
                t = N(t);
                return t is "isit aplant" or "isit foundinnature" or "isit usuallyfoundoutdoors" or "isitusuallymadeofwood";
            }
            bool FamilyObjectTech(string t)
            {
                t = N(t);
                return t is "isit anobject" or "isit usedforcommunication" or "isit relatedtotechnology" or "isit poweredbyelectricity" or "doesit usebatteries" or "doesit haveascreen" or "doesit havebuttons";
            }

            // 4) מסננים ומדרגים – רק שאלות שבאמת מחלקות את הקבוצה (0<p<1), עם ניקוד אינפורמציה
            const int MIN_COVERAGE = 3; // מספיק נמוך כדי שתמיד יהיו מועמדים
            var candidates =
                from q in allQs
                where q.QuestionId != exId
                let norm = N(q.Text)
                where string.IsNullOrEmpty(exTextNorm) || norm != exTextNorm
                where statsByQ.ContainsKey(q.QuestionId)
                let st = statsByQ[q.QuestionId]
                where st.Total >= MIN_COVERAGE
                where st.YesCount > 0 && st.YesCount < st.Total // לא p==0/1
                                                                // סינון “משפחות” לפי מסקנות־על
                where !(livingAlwaysFalse && (norm == "isit alivingthing" || FamilyAnimal(q.Text) || FamilyPlant(q.Text)))
                where !(livingAlwaysTrue && (norm == "isit aplace")) // אם 100% living, "place" מיותר
                where !(manmadeAlwaysTrue && (FamilyAnimal(q.Text) || FamilyPlant(q.Text)))
                where !(manmadeAlwaysFalse && FamilyObjectTech(q.Text))
                where !(objectAlwaysFalse && FamilyObjectTech(q.Text))
                select new
                {
                    q.Text,
                    Score = InfoScore(st.YesCount, st.Total),
                    Rank = q.DifficultyRank ?? int.MaxValue
                };

            var top = candidates
                .OrderByDescending(x => x.Score)
                .ThenBy(x => x.Rank)
                .ThenBy(x => x.Text)
                .Take(4)
                .Select(x => x.Text)
                .ToList();

            // 5) מילוי אם חסר (עדיין לא נוותר על 0<p<1 כדי לא להציע שאלות “מתות”)
            if (top.Count < 4)
            {
                var fillers =
                    from q in allQs
                    where q.QuestionId != exId
                    let norm = N(q.Text)
                    where string.IsNullOrEmpty(exTextNorm) || norm != exTextNorm
                    where statsByQ.ContainsKey(q.QuestionId)
                    let st = statsByQ[q.QuestionId]
                    where st.YesCount > 0 && st.YesCount < st.Total
                    orderby st.Total descending, (q.DifficultyRank ?? int.MaxValue), q.Text
                    select q.Text;

                foreach (var f in fillers)
                {
                    if (top.Count >= 4) break;
                    if (!top.Contains(f)) top.Add(f);
                }
            }

            // 6) fallback אחרון: אם עדיין חסר – קח שאלות פעילות שלא הוצעו, אבל עדיין דרוש 0<p<1
            if (top.Count < 4)
            {
                foreach (var q in allQs.OrderBy(q => q.DifficultyRank ?? int.MaxValue).ThenBy(q => q.QuestionId))
                {
                    if (q.QuestionId == exId) continue;
                    var norm = N(q.Text);
                    if (!string.IsNullOrEmpty(exTextNorm) && norm == exTextNorm) continue;
                    if (!statsByQ.TryGetValue(q.QuestionId, out var st)) continue;
                    if (!(st.YesCount > 0 && st.YesCount < st.Total)) continue;
                    if (!top.Contains(q.Text)) top.Add(q.Text);
                    if (top.Count >= 4) break;
                }
            }

            return top.Distinct().Take(4).ToArray();
        }


        private static List<int> ReadCandidates(GuessMasterSession s)
            => string.IsNullOrWhiteSpace(s.CandidateWordIdsJson)
                ? new List<int>()
                : JsonSerializer.Deserialize<List<int>>(s.CandidateWordIdsJson) ?? new List<int>();

        private static void WriteCandidates(GuessMasterSession s, List<int> ids)
            => s.CandidateWordIdsJson = JsonSerializer.Serialize(ids);

        private static string NormalizeQuestionText(string? s)
        {
            if (string.IsNullOrWhiteSpace(s)) return string.Empty;
            var span = s.Trim().ToLowerInvariant().Where(char.IsLetterOrDigit);
            return new string(span.ToArray());
        }
    }
}
