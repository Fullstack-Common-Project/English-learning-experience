using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EnglishGamesPlatform.Backend.Models.Entities
{
    public class ImageSentence
    {
        [Key]
        public int ImageSentenceId { get; set; } // מפתח ראשי

        [Required]
        public int ImageId { get; set; } // מזהה התמונה

        [Required]
        public int CorrectSentenceId { get; set; } // מזהה המשפט הנכון

        // Navigation Properties – מאפשרים לגשת לאובייקטים קשורים ב‑EF
        [ForeignKey(nameof(ImageId))]
        public Image Image { get; set; } = null!;

        [ForeignKey(nameof(CorrectSentenceId))]
        public Sentence CorrectSentence { get; set; } = null!;
    }
}
