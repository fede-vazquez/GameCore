using Microsoft.EntityFrameworkCore;

namespace GameCore.Config
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
    }
}
