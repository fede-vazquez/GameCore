using System;

namespace GameCore.Repositories;

using GameCore.Models.User;
using GameCore.Config;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Linq;

public interface IUserRepository : IRepository<User> { }
public class UserRepository : Repository<User>, IUserRepository
{
    private readonly ApplicationDbContext _db;
    public UserRepository(ApplicationDbContext db) : base(db)
    {
        _db = db;
    }
    new async public Task<User> GetOne(Expression<Func<User, bool>>? filter = null)
    {
        IQueryable<User> query = dbSet;
        if (filter != null)
        {
            query = query.Where(filter).Include(x => x.Rol);
        }
        return await query.FirstOrDefaultAsync();
    }
}
