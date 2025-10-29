using Microsoft.EntityFrameworkCore;
using GameCore.Models.User;

namespace GameCore.Config
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        // relaciona propiedades de la db con su nombre, 
        // y al tipo correspondiente
        public DbSet<User> User { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }
    }
}
