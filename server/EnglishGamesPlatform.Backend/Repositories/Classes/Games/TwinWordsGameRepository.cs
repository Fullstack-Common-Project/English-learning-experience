using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.GameInitialDatas;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;

namespace EnglishGamesPlatform.Backend.Repositories.Classes.Games
{
    public class TwinWordsGameRepository : IGeneralGameRepository
    {

        private readonly ITwinWordRepository _twinWordRepository;
        private readonly IWordRepository _wordRepository;

        public TwinWordsGameRepository(ITwinWordRepository twinWordRepository, IWordRepository wordRepository)
        {
            _twinWordRepository = twinWordRepository;
            _wordRepository = wordRepository;
        }
        public string GameName => "Twin words";
        public async Task<GameInitialData> GetData()
        {
            var pairs = await _twinWordRepository.GetRandomPairsTwinWordsAsync();
            var data = new TwinWordsData();

            foreach (var pair in pairs)
            {
                var wrongOptions = (await _wordRepository
                    .GetWordsAsync(pair.BaseWordId, pair.SynonymWordId))
                    .Select(w => w.WordText)
                    .ToList();

                var options = wrongOptions.Append(pair.SynonymWord.WordText).ToList();
                var shuffled = options.OrderBy(x => Guid.NewGuid()).ToList();
                int correctIndex = shuffled.IndexOf(pair.SynonymWord.WordText);

                data.AddItem(new TwinWordsItem
                {
                    Id = pair.TwinWordId,
                    Word = pair.BaseWord.WordText,
                    Options = shuffled.ToArray(),
                    CorrectIndex = correctIndex
                });
            }

            return data;
        }
    }
}
