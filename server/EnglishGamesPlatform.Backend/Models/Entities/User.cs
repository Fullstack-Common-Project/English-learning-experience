using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace EnglishGamesPlatform.Backend.Models.Entities
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required, MaxLength(100)]
        public string FullName { get; set; } = null!;
        [Required, EmailAddress]
        public string Email { get; set; } = null!;

        [Required, MaxLength(100)]
        [JsonIgnore]
        public string Password { get; set; } =null!;

        [JsonIgnore]
        public ICollection<GameResult> GameResults { get; set; } = new List<GameResult>();

        [JsonIgnore]
        public ICollection<Progress> Progress{ get; set; } = new List<Progress>();
    }
}
