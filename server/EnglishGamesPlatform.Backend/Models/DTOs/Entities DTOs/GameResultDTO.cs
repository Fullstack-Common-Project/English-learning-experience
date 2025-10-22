namespace EnglishGamesPlatform.Backend.Models.DTOs.Entities_DTOs
{
    public class GameResultDTO
    {
        public int GameID { get; set; }
        public int UserID { get; set; }
        public int Score { get; set; }
        public double Time { get; set; } // in seconds
        public int Rounds { get; set; }
    }
}
