using System.ComponentModel.DataAnnotations;

namespace EnglishGamesPlatform.Backend.Models.Entities
{
    public class Game
    {
        [Key]
        public int GameId { get; set; }
        [Required, MaxLength(100)]
        public string GameName { get; set; } = null!;

        public ICollection<GameResult> GameResults { get; set; } = new List<GameResult>();
        public ICollection<Progress> Progress { get; set; } = new List<Progress>();
    }
}
