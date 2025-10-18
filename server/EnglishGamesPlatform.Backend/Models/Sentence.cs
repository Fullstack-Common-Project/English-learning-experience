using System.ComponentModel.DataAnnotations;

namespace server.models
{
    public class Sentence
    {
        [Key]
        public int SentenceId { get; set; }

        [Required]
        public string SentenceText { get; set; } = null!;
    }

}
