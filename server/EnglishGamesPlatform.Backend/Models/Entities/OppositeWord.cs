using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EnglishGamesPlatform.Backend.Models.Entities
{
    public class OppositeWord
    {
        [Key]
        public int OppositeWordId { get; set; }

        [Required]
        public int FirstWordId { get; set; }

        [Required]
        public int SecondWordId { get; set; }

        [ForeignKey(nameof(FirstWordId))]
        public Word FirstWord { get; set; } = null!;

        [ForeignKey(nameof(SecondWordId))]
        public Word SecondWord { get; set; } = null!;

    }
}
