namespace EnglishGamesPlatform.Backend.Models
{
    public class LeaderboardEntry
    {
        public int Rank { get; set; }
        public string UserName { get; set; } = string.Empty;
        public int Score { get; set; }
        public double Time { get; set; }
    }
}
