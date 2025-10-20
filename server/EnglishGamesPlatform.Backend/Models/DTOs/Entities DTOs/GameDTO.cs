namespace EnglishGamesPlatform.Backend.Models.DTOs.Entities_DTOs
{
    public class GameDTO
    {
        public int GameId { get; set; }
        public string? GameName { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public string? Instructions { get; set; }
    }
}
