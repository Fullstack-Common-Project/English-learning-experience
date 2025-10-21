using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace EnglishGamesPlatform.Backend.Models.Entities
{
    public class Word
    {
        [Key]
        public int WordId { get; set; }

        [Required, MaxLength(100)]
        public string WordText { get; set; } = null!;

        [ForeignKey("Category")]
        public int CategoryId { get; set; }
        public Category Category { get; set; } = null!;
        public ICollection<Image> Images { get; set; } = new List<Image>();
    }
}
