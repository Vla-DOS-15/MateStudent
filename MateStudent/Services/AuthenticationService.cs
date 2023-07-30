using MateStudent.Models;
using System.Linq;
using System;

namespace MateStudent.Services
{
    public class AuthenticationService
    {
        private readonly MateStudentDbContext _dbContext;

        public AuthenticationService(MateStudentDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public User Authenticate(string email, string password)
        {
            // Find the user based on the provided email
            var user = _dbContext.Users.FirstOrDefault(u => u.Email == email);

            // Check if the user exists and the password is correct
            if (user != null && password.Equals(user.Password) && email.Equals(user.Email))
            {
                // Authentication successful
                return user;
            }

            // Authentication failed
            return null;
        }

        // Helper method to create password hash
        private string CreatePasswordHash(string password)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                var passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(passwordHash);
            }
        }

        // Helper method to verify the password hash
        private bool VerifyPasswordHash(string password, string storedHash)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(computedHash) == storedHash;
            }
        }
    }

}
