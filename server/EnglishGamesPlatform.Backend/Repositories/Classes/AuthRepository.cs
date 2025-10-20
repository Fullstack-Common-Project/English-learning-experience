
using EnglishGamesPlatform.Backend.Data;
using EnglishGamesPlatform.Backend.Models;
using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.Entities;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnglishGamesPlatform.Backend.Repositories.Implementations
{
    public class AuthRepository : IAuthRepository
    {
        private readonly AppDbContext _context;

        public AuthRepository(AppDbContext context)
        {
            _context = context;
        }

  

        public async Task Register(RegisterDTO newUser)
        {
            await _context.Users.AddAsync(new User {FullName=newUser.UserName!,Password=newUser.Password,Email=newUser.Email });
             _context.SaveChanges();
        }
        public async Task<User?> IsExistingUser(string email)
        {
            return await _context.Users
                                 .FirstOrDefaultAsync(u => u.Email == email);
        }

    }
}
