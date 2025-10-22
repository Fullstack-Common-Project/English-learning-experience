using EnglishGamesPlatform.Backend.Repositories.Interfaces;

namespace EnglishGamesPlatform.Backend.Repositories.Classes.Games
{
    public class SentenceShuffleRepository:ISentenceShuffleRepository
    {
        public string GameName => "Sentence Shuffle";

        Task<GameInitialData> IGeneralGameRepository.GetInitialDataAsync()
        {
            var initialData = new SentenceShuffleData
            {
                Sentences = new List<string>
                {
                    "The quick brown fox jumps over the lazy dog.",
                    "Learning English can be fun and exciting.",
                    "Practice makes perfect in language learning.",
                    "She sells seashells by the seashore.",
                    "A journey of a thousand miles begins with a single step."
                }
            };
            return Task.FromResult<GameInitialData>(initialData);
        }

    }
}
