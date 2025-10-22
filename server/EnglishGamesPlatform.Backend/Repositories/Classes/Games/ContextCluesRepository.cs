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

        var questions = await _context.MissingWords
            .Include(m => m.Sentence)
            .Include(m => m.CorrectWord)
            .OrderBy(r => Guid.NewGuid())
            .Take(5)
            .ToListAsync();

        var questionDtos = new List<ContextCluesModel>();
        int id = 1;

        foreach (var m in questions)
        {

            var distractors = await _context.Words
                .Where(w => w.CategoryId == m.CorrectWord.CategoryId && w.WordId != m.CorrectWordId)
                .OrderBy(r => Guid.NewGuid())
                .Take(3)
                .Select(w => w.WordText)
                .ToListAsync();


            var options = distractors.Append(m.CorrectWord.WordText).OrderBy(r => Guid.NewGuid()).ToList();
            int correctIndex = options.IndexOf(m.CorrectWord.WordText);

            questionDtos.Add(new ContextCluesModel
            {
                Id = id,
                Sentence = m.Sentence.SentenceText.Replace(m.CorrectWord.WordText, "___"),
                Options = options,
                CorrectIndex = correctIndex
            });
            id++;
        }

        return new ContextCluesData
        {
            contextCluesList = questionDtos
        };
    }
}
