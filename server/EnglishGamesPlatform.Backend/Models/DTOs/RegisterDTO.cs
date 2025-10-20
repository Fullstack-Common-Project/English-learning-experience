namespace EnglishGamesPlatform.Backend.Models.DTOs
{
    public class RegisterDTO
    {
        public string? UserName { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
