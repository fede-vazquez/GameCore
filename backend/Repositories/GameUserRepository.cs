using System;

namespace GameCore.Repositories;

using GameCore.Models.GameUser;
using GameCore.Config;
using GameCore.Specifications;
using Microsoft.EntityFrameworkCore;

public interface IGameUserRepository : IRepository<GameUser>
{
    public Task<IEnumerable<GameUser>> GetAllAsync(ISpecification<GameUser> spec = null);
    public Task<int> GetCountAsync(ISpecification<GameUser> spec);
}

public class GameUserRepository : Repository<GameUser>, IGameUserRepository
{
    private readonly ApplicationDbContext _db;
    public GameUserRepository(ApplicationDbContext db) : base(db)
    {
        _db = db;
    }
    public async Task<IEnumerable<GameUser>> GetAllAsync(ISpecification<GameUser> spec = null)
    {
        var filteredQuery = SpecificationEvaluator.GetFilteredQuery(_db.GameUsers, spec);
        var paginatedQuery = SpecificationEvaluator.ApplyPaging(filteredQuery, spec);
        return await paginatedQuery.ToListAsync();
    }
    public async Task<int> GetCountAsync(ISpecification<GameUser> spec)
    {
        return await SpecificationEvaluator.GetFilteredQuery(_db.GameUsers, spec).CountAsync();
    }
}
