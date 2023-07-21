using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MateStudent.Models
{
    public class Assignment
    {
        [Key]
        public int AssignmentId { get; set; }
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        public int TaskId { get; set; }
        [ForeignKey("TaskId")]
        public Task Task { get; set; }
        public DateTime DateAssigned { get; set; }
    }
}
