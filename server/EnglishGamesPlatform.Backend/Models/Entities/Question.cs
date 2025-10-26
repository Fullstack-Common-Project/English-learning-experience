using System.ComponentModel.DataAnnotations;

namespace EnglishGamesPlatform.Backend.Models.Entities
{
    public class Question
    {
        [Key]
        public int QuestionId { get; set; }
        [Required, MaxLength(200)]
        public string Text { get; set; }
        public bool IsActive { get; set; }
        public int? DifficultyRank { get; internal set; }
    }
}
