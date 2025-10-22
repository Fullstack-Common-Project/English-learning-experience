using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace EnglishGamesPlatform.Backend.Models.Entities
{
    public class Image
    {
        [Key]
        public int ImageId { get; set; }

        [Required]
        public string ImageUrl { get; set; } = null!;

        [ForeignKey("Word")]
        public int WordId { get; set; }
        public Word Word { get; set; } = null!;

        //public Sentence sentence { get; set; }
    }
}
