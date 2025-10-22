using EnglishGamesPlatform.Backend.Models;
using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.Entities;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;
using EnglishGamesPlatform.Backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EnglishGamesPlatform.Backend.Controllers
{
   
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService; 
        }


        [HttpPost("google-login")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginDTO googleUser)
        {
            var res = await _authService.GoogleLogin(googleUser.IdToken);

            if (!res.IsSuccess)
                return StatusCode((int)res.StatusCode, res.Message);

            return Ok(new { res.Data!.Token, res.Data.User, res.Message });
        }



        [HttpPost("login")]
        public async Task< IActionResult> Login([FromBody] LoginDto user)
        {
            var res= await _authService.Login(user);
            if(!res.IsSuccess)
                return StatusCode((int)res.StatusCode,res.Message);
            else
            {
                return Ok(new {res.Data!.Token,res.Data.User,res.Message});    
            }
        }

        [HttpPost("register")]
        public async  Task<IActionResult> Register([FromBody] RegisterDTO user)
        {
            var res = await _authService.Register(user);
            if (!res.IsSuccess)
                return StatusCode((int)res.StatusCode, res.Message);
            else
            {
                return Ok(new { res.Data!.Token, res.Data.User, res.Message });
            }
        }




    }
}
