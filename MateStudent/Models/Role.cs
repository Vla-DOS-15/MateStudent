using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MateStudent.Models
{
    public class Role
    {
        [Key]
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public ICollection<User> Users { get; set; }
    }
}
