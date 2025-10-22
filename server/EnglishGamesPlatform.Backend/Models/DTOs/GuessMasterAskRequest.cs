namespace EnglishGamesPlatform.Backend.Models.DTOs
{
    public class GuessMasterAskRequest
    {
        public Guid SessionId { get; set; }
        public string? QuestionText { get; set; }
        public int? QuestionId { get; set; }     // אופציונלי, אם תעדיפי לפי Id
        public bool IsGuess { get; set; } = false;
        public string? GuessWord { get; set; }
    }
    public class GuessMasterAskResponse
    {
        public Guid SessionId { get; set; }
        public bool? YesNoAnswer { get; set; }        // null אם זה ניחוש
        public bool? GuessCorrect { get; set; }       // null אם זו שאלה
        public int RemainingTurns { get; set; }
        public string[] NextSuggestedQuestions { get; set; } = Array.Empty<string>();
        public bool GameOver { get; set; }
        public bool? Won { get; set; }
    }
}
