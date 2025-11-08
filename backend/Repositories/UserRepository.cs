using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GameCore.Specifications;
using Microsoft.EntityFrameworkCore;
namespace GameCore.Repositories;

using GameCore.Models.User;
using GameCore.Config;
public interface IUserRepository : IRepository<User>
{
    public Task<IEnumerable<User>> GetAllAsync(ISpecification<User> spec);
}
public class UserRepository : Repository<User>, IUserRepository
{
    private readonly ApplicationDbContext _db;
    public UserRepository(ApplicationDbContext db) : base(db)
    {
        _db = db;
    }
    public async Task<IEnumerable<User>> GetAllAsync(ISpecification<User> spec = null)
    {
        return await SpecificationEvaluator.GetQuery(_db.Users, spec).ToListAsync();
    }

}
