using Microsoft.AspNetCore.Mvc.RazorPages;
using System.ComponentModel.DataAnnotations;
using System;

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
        public string Password { get; set; } =null!;

        public ICollection<GameResult> GameResults { get; set; } = new List<GameResult>();
        public ICollection<Progress> Progress{ get; set; } = new List<Progress>();
    }
}
