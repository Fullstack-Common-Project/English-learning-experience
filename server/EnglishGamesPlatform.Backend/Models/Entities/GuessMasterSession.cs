using System.ComponentModel.DataAnnotations;

namespace EnglishGamesPlatform.Backend.Models.Entities
{
    public class GuessMasterSession
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid(); 

        [Required]
        public string PlayerName { get; set; } = "anonymous";

        [Required]
        public int SecretWordId { get; set; } 

        public int TurnsUsed { get; set; } = 0;
        public int MaxTurns { get; set; } = 20;

        public DateTime StartedAtUtc { get; set; } = DateTime.UtcNow;

        public string CandidateWordIdsJson { get; set; } = "[]";

       
    }
}
