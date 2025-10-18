using System.ComponentModel.DataAnnotations;

namespace server.models
{
    public class Game
    {
        [Key]
        public int GameId { get; set; }
        [Required, MaxLength(100)]
        public string GameName { get; set; }= null!;

        public ICollection<GameResult> GameResults { get; set; } = new List<GameResult>();
        public ICollection<Progress> Progress { get; set; } = new List<Progress>();
    }
}
