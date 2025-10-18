using System.ComponentModel.DataAnnotations;

namespace server.models
{
    public class Category
    {
        [Key]
        public int CategoryId { get; set; }

        [Required, MaxLength(100)]
        public string CategoryName { get; set; }= null!;

        public ICollection<Word> Words { get; set; } = new List<Word>();
    }
}
