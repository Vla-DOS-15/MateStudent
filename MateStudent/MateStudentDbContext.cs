using MateStudent.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace MateStudent
{
    public class MateStudentDbContext : DbContext
    {
        public DbSet<Task> Tasks { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Assignment> Assignments { get; set; }
        public DbSet<Role> Roles { get; set; }
        public MateStudentDbContext(DbContextOptions<MateStudentDbContext> options) : base(options)
        {
            //Database.EnsureDeleted();
            //Database.EnsureCreated();
            //using (MateStudentDbContext db = new MateStudentDbContext(options))
            //{
            //    db.Tasks.Add(new Task { Title = "t1", Description = "d1" });
            //    db.SaveChanges();
            //}

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Assignment>()
                .HasKey(a => new { a.UserId, a.TaskId });

            modelBuilder.Entity<Assignment>()
                .HasOne(a => a.User)
                .WithMany(u => u.Assignments)
                .HasForeignKey(a => a.UserId);

            modelBuilder.Entity<Assignment>()
                .HasOne(a => a.Task)
                .WithMany(t => t.Assignments)
                .HasForeignKey(a => a.TaskId);

            base.OnModelCreating(modelBuilder);
        }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=FreelanceExchangeDb;Trusted_Connection=True;");
        //}

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Task>()
        //        .HasMany(t => t.Users)
        //        .WithOne(u => u.Tasks)
        //        .UsingEntity<Assignment>(
        //            j => j.HasOne(a => a.User).WithMany(),
        //            j => j.HasOne(a => a.Task).WithMany())
        //        .Property(a => a.DateAssigned)
        //        .HasDefaultValueSql("GETDATE()");

        //    base.OnModelCreating(modelBuilder);
        //}
    }
}
