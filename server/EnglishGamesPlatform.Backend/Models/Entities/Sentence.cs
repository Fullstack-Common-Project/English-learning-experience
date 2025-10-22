using System.ComponentModel.DataAnnotations;

namespace EnglishGamesPlatform.Backend.Models.Entities
{
    public class Sentence
    {
        [Key]
        public int SentenceId { get; set; }

        [Required]
        public string SentenceText { get; set; } = null!;
    }

}
