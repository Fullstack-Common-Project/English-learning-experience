using System.ComponentModel.DataAnnotations;

namespace EnglishGamesPlatform.Backend.Models.Entities
{
    public class GrammarQuestionFakeSentence
    {
        [Key]
        public int Id { get; set; }

        
        public int GrammarQuestionId { get; set; }
        public GrammarQuestion GrammarQuestion { get; set; }

        public string Sentence { get; set; } = string.Empty;
    }

}
