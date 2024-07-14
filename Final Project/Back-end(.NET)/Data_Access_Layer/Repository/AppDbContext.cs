using Data_Access_Layer.Repository.Entities;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;
using System.Reflection;

namespace Data_Access_Layer.Repository
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }
        public DbSet<User> User { get; set; }
        public DbSet<UserDetail> UserDetail { get; set; }
        public DbSet<Country> Country { get; set; }
        public DbSet<City> City { get; set; }
        public DbSet<Missions> Missions { get; set; }
        public DbSet<ContactUs> ContactUs { get; set; }
        public DbSet<MissionApplication> MissionApplication { get; set; }
        public DbSet<UserSkills> UserSkills { get; set; }
        public DbSet<MissionTheme> MissionTheme { get; set; }
        public DbSet<MissionSkill> MissionSkill { get; set; }

    }
}
