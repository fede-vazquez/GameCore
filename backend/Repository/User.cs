using GameCore.Config;
using GameCore.Models.User;

namespace GameCore.Repository
{
    public interface IUserRepository : IRepository<User> { }

    public class UserRepository : Repository<User>, IUserRepository
    {

        private readonly ApplicationDbContext _db;

        public UserRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
    }




}