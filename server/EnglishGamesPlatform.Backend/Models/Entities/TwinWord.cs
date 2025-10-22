using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace EnglishGamesPlatform.Backend.Models.Entities
{
    public class TwinWord
    {
        [Key]
        public int TwinWordId { get; set; }

        [Required]
        public int BaseWordId { get; set; }

        [Required]
        public int SynonymWordId { get; set; }

        [ForeignKey(nameof(BaseWordId))]
        public Word BaseWord { get; set; } = null!;

        [ForeignKey(nameof(SynonymWordId))]
        public Word SynonymWord { get; set; } = null!;
    }
}
