using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MateStudent.Models
{
    public class Task
    {
        [Key]
        public int TaskId { get; set; }
        public string Subject { get; set; }
        public string Title { get; set; }
        public string TypeOfWork { get; set; }
        public string Description { get; set; }
        public DateTime PublicationData { get; set; }
        public DateTime Deadline { get; set; }
        public decimal? Price { get; set; }
        public string FileName { get; set; }
        public ICollection<Assignment> Assignments { get; set; }
    }

}
