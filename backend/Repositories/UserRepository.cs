using System;

namespace GameCore.Repositories;

using GameCore.Models.User;
using GameCore.Config;
public interface IUserRepository : IRepository<User> { }
public class UserRepository : Repository<User>, IUserRepository
{
    private readonly ApplicationDbContext _db;
    public UserRepository(ApplicationDbContext db) : base(db)
    {
        _db = db;
    }
}
