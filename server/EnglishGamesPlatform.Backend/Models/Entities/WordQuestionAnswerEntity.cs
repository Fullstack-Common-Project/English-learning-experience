using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EnglishGamesPlatform.Backend.Models.Entities
{
    public class WordQuestionAnswerEntity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int WordId { get; set; }

        [Required]
        public int QuestionId { get; set; }

        [Required]
        public bool AnswerYes { get; set; }

        [ForeignKey(nameof(WordId))]
        public Word Word { get; set; } = null!;

        [ForeignKey(nameof(QuestionId))]
        public Question Question { get; set; } = null!;
    
    }
}
