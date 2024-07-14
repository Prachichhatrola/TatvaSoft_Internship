using DAL.Models;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace DAL
{
    public class UserDbContext : DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
    }
}
