using System.ComponentModel.DataAnnotations;

namespace EnglishGamesPlatform.Backend.Models.Entities
{
    public class MissingWordSentence
    {
       
        public int MissingWordSentenceId { get; set; }
        public int SentenceId { get; set; }   
        public Sentence Sentence { get; set; } 
        public int CorrectWordId { get; set; } 
        public Word CorrectWord { get; set; } 
    }
}
