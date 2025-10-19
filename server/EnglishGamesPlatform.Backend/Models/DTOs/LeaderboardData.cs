namespace EnglishGamesPlatform.Backend.Models
{
    public class LeaderboardData
    {
        public int GameId { get; set; }
        public List<LeaderboardEntry> Leaderboards { get; set; } = new ();
    }
}
