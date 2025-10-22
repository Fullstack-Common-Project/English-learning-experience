using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EnglishGamesPlatform.Backend.Models.Entities
{
    public class MemoryMatchSynonymsPair
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Synonym { get; set; } = null!;

        [ForeignKey("Word")]
        public int WordId { get; set; }
        public Word Word { get; set; } = null!;
    }
}
