using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EnglishGamesPlatform.Backend.Models.Entities
{
    public class SentenceWord
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey(nameof(Sentence))]
        public int SentenceId { get; set; }

        [ForeignKey(nameof(Word))]
        public int WordId { get; set; }

        [Required]
        public int Position { get; set; }  

        public Sentence Sentence { get; set; } = null!;
        public Word Word { get; set; } = null!;
    }

}
