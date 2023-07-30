using System.Collections.Generic;
using System.Threading.Tasks;
using MateStudent.DataModels;
using MateStudent.Models;
using MateStudent.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MateStudent.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly MateStudentDbContext _dbContext;
        private readonly AuthenticationService _authenticationService;

        public AuthenticationController(MateStudentDbContext dbContext, AuthenticationService authenticationService)
        {
            _dbContext = dbContext;
            _authenticationService = authenticationService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Models.User>>> Index()
        {
            return await _dbContext.Users.ToListAsync();
        }
        [HttpPost("login")]
        public async Task<ActionResult<IEnumerable<Models.User>>> Login([FromBody] User model)
        {
            var user =  _authenticationService.Authenticate(model.Email, model.Password);

            if (user == null)
                return Unauthorized();

            // Return any necessary user information after successful login (e.g., UserId, Name, etc.)
            return Ok(new { user.UserId, user.Name, user.Email });
        }
    }
}
