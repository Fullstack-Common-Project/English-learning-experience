using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.GameInitialDatas;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;

namespace EnglishGamesPlatform.Backend.Repositories.Classes.Games
{
    public class GrammarGuruRepository : IGeneralGameRepository
    {
        private readonly IGrammarQuestionRepository _grammarQuestionRepository;
        private readonly ISentenceRepository _sentenceRepository;
        private readonly IFakeSentenceRepository _fakeSentenceRepository;

        public GrammarGuruRepository(
            IGrammarQuestionRepository grammarQuestionRepository,
            ISentenceRepository sentenceRepository,
            IFakeSentenceRepository fakeSentenceRepository)
        {
            _grammarQuestionRepository = grammarQuestionRepository;
            _sentenceRepository = sentenceRepository;
            _fakeSentenceRepository = fakeSentenceRepository;
        }

        public string GameName => "Grammar Guru";

        public async Task<GameInitialData> GetData()
        {
            var questions = await _grammarQuestionRepository.GetAllAsync(); 

            if (questions == null || !questions.Any())
                return new GrammarGuruDataList { Data = new List<GrammarGuruData>() };

            var random = new Random();
            var dataList = new List<GrammarGuruData>();

            foreach (var q in questions)
            {

                var correctSentence = await _sentenceRepository.GetByIdAsync(q.CorrectSentenceId);
                var fakeSentences = await _fakeSentenceRepository.GetByQuestionIdAsync(q.Id);

                var allSentences = new List<string> { correctSentence!.SentenceText };
                allSentences.AddRange(fakeSentences.Select(fs => fs.Sentence));
                allSentences = allSentences.OrderBy(s => random.Next()).ToList();

                var correctIndex = allSentences.IndexOf(correctSentence.SentenceText);

                dataList.Add(new GrammarGuruData
                {
                    Sentences = allSentences.ToArray(),
                    CorrectIndex = correctIndex
                });
            }

            return new GrammarGuruDataList { Data = dataList };
        }
    }
}
