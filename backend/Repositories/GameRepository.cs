using System;

namespace GameCore.Repositories;

using GameCore.Models.Game;
using GameCore.Config;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using GameCore.Specifications;

public interface IGameRepository : IRepository<Game>
{
    public Task<IEnumerable<Game>> GetGamesByUserIdAsync(int userId);
    public Task CreateManyAsync(List<Game> games);

    public Task<IEnumerable<Game>> GetAllAsync(ISpecification<Game> spec);
    public Task<int> GetCountAsync(ISpecification<Game> spec);

}
public class GameRepository : Repository<Game>, IGameRepository
{
    private readonly ApplicationDbContext _db;
    public GameRepository(ApplicationDbContext db) : base(db)
    {
        _db = db;
    }

    public async Task<IEnumerable<Game>> GetAllAsync(ISpecification<Game> spec = null)
    {
        var filteredQuery = SpecificationEvaluator.GetFilteredQuery(_db.Games, spec);
        var paginatedQuery = SpecificationEvaluator.ApplyPaging(filteredQuery, spec);
        return await paginatedQuery.ToListAsync();
    }
    public async Task<int> GetCountAsync(ISpecification<Game> spec)
    {
        return await SpecificationEvaluator.GetFilteredQuery(_db.Games, spec).CountAsync();
    }

    public override async Task<Game> GetOneAsync(Expression<Func<Game, bool>>? filter = null)
    {
        IQueryable<Game> query = _db.Games;
        if (filter != null)
        {
            query = query.Where(filter);
        }
        query = query.Include(g => g.Genres);
        query = query.Include(g => g.Developer);
        query = query.Include(g => g.Discounts);
        query = query.Include("Discounts.Percentage");
        return await query.FirstOrDefaultAsync();
    }
    public async Task CreateManyAsync(List<Game> games)
    {
        await _db.Games.AddRangeAsync(games);
        await _db.SaveChangesAsync();
    }

    public async Task<IEnumerable<Game>> GetGamesByUserIdAsync(int userId)
    {
        IQueryable<Game> query = _db.Games;
        query = query.Where(g => g.GameUsers.Any(gu => gu.UserId == userId));
        return await query.ToListAsync();
    }
}
