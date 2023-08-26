using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using MateStudent.DataModels;
using MateStudent.Models;
using MateStudent.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System;

namespace MateStudent.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly MateStudentDbContext _dbContext;
        private readonly Services.AuthenticationService _authenticationService;

        public AuthenticationController(MateStudentDbContext dbContext, Services.AuthenticationService authenticationService)
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
            var user = _authenticationService.Authenticate(model.Email, model.Password);

            if (user == null)
                return Unauthorized();

            // Create a cookie with user information
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var authProperties = new AuthenticationProperties
            {
                IsPersistent = true, // Make the cookie persistent across sessions
                ExpiresUtc = DateTimeOffset.UtcNow.AddHours(1) // Set expiration time for the cookie

            };

            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity), authProperties);

            return Ok(new { user.UserId, user.Name, user.Email });
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return NoContent();
        }
    }
}
