namespace EnglishGamesPlatform.Backend.Models.DTOs
{
    public class LeaderboardData
    {
        public int GameId { get; set; }
        public List<LeaderboardEntry> Leaderboards { get; set; } = new ();
    }
}
