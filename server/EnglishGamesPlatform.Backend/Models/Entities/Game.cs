using System.ComponentModel.DataAnnotations;

namespace EnglishGamesPlatform.Backend.Models.Entities
{
    public class Game
    {
        [Key]
        public int GameId { get; set; }

        [Required, MaxLength(100)]
        public string GameName { get; set; } = null!;

        public string? Description { get; set; }

        public string? ImageUrl { get; set; }

        public string? Instructions { get; set; }

        public ICollection<GameResult> GameResults { get; set; } = new List<GameResult>();
        public ICollection<Progress> Progress { get; set; } = new List<Progress>();
    }
}
