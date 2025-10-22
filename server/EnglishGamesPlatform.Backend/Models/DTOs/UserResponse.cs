using EnglishGamesPlatform.Backend.Models.Entities;

namespace EnglishGamesPlatform.Backend.Models.DTOs
{
    public class UserResponse
    {
        public User? User { get; set; }
        public string? Token { get; set; } = string.Empty;   

    }
}
