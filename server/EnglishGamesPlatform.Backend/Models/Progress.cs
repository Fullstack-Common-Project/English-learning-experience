using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace server.models
{
    public class Progress
    {
        [Key]
        public int ProgressId { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; } = null!;

        [ForeignKey("Game")]
        public int GameId { get; set; }
        public Game Game { get; set; } = null!;

        public int Round { get; set; }
        public int ScoreSoFar { get; set; }
        public double TimePassed { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
