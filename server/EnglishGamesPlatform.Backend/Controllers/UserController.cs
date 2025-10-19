using EnglishGamesPlatform.Backend.Models;
using EnglishGamesPlatform.Backend.Models.Entities;
using EnglishGamesPlatform.Backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EnglishGamesPlatform.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IGenericService<User> _userService;

        public UserController(IGenericService<User> userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult<Response<IEnumerable<User>>>> GetAllUsersAsync()
        {
             Response<IEnumerable<User>> response = await _userService.GetAllAsync();
                if (response.IsSuccess)
                    return Ok(response);
                else
                    return StatusCode(response.StatusCode, response);
        }
    }
}
