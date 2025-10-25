using EnglishGamesPlatform.Backend.Data;
using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.GameInitialDatas;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

public class ContextCluesRepository : IGeneralGameRepository
{
    private readonly AppDbContext _context;
    public string GameName => "Context Clues";

    public ContextCluesRepository(AppDbContext context)
    {
        _context = context;
    }

   public async Task<GameInitialData> GetData()
{
    // סופרים כמה שאלות יש
    var count = await _context.MissingWords.CountAsync();
    if (count == 0) return null;

    // בוחרים אינדקס רנדומלי
    var random = new Random();
    int skip = random.Next(count);

    // מדלגים לאותה שורה ומביאים רק אחת
    var m = await _context.MissingWords
        .Include(mw => mw.Sentence)
        .Include(mw => mw.CorrectWord)
        .Skip(skip)
        .Take(1)
        .FirstOrDefaultAsync();

    if (m == null) return null;

    // שולף 3 מילים הסחות מאותה קטגוריה
    var distractors = await _context.Words
        .Where(w => w.CategoryId == m.CorrectWord.CategoryId && w.WordId != m.CorrectWordId)
        .OrderBy(r => Guid.NewGuid())
        .Take(3)
        .Select(w => w.WordText)
        .ToListAsync();

    // מערבב את כל האופציות
    var options = distractors.Append(m.CorrectWord.WordText)
                             .OrderBy(r => Guid.NewGuid())
                             .ToList();

    int correctIndex = options.IndexOf(m.CorrectWord.WordText);

    // בונה את האובייקט של השאלה
    return new ContextCluesData
    {
        Id = m.CorrectWordId,
        Sentence = m.Sentence.SentenceText.Replace(m.CorrectWord.WordText, "___"),
        Options = options,
        CorrectIndex = correctIndex
    };
   }
}
