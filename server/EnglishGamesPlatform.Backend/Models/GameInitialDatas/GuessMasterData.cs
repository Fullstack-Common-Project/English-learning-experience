using EnglishGamesPlatform.Backend.Models.DTOs;

namespace EnglishGamesPlatform.Backend.Models.GameInitialDatas
{
    public class GuessMasterData: GameInitialData
    {
        public Guid SessionId { get; set; }
        public string Title { get; set; } = "GuessMaster 20";
        public int MaxTurns { get; set; }
        public int RemainingTurns { get; set; }
        public string[] SuggestedQuestions { get; set; }= Array.Empty<string>();
    }
    public class AskRequest
    {
        public Guid SessionId { get; set; }
        public string QuestionText { get; set; } = default!;
        public bool? IsGuess { get; set; }
        public string? GuessWord { get; set; }
    }
    public class AskResponse
    {
        public Guid SessionId { get; set; }
        public bool? YesNoAnswer { get; set; }//null case guess
        public bool? GuessCorrect { get; set; }//null case question
        public int RemainingTurns { get; set; }
        public string[] NextSuggestedQuestions { get; set; } = Array.Empty<string>();
        public bool GameOver { get; set; }
        public bool? Won { get; set; }
    }
}
