using System.ComponentModel.DataAnnotations;

namespace EnglishGamesPlatform.Backend.Models.Entities
{
    public class GrammarQuestion
    {
        [Key]
        public int Id { get; set; }

        public int CorrectSentenceId { get; set; }
        public Sentence CorrectSentence { get; set; }
        public ICollection<GrammarQuestionFakeSentence> FakeSentences { get; set; }
    }

}
