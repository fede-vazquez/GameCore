using System;

namespace GameCore.Repositories;

using GameCore.Models.Game;
using GameCore.Config;
using GameCore.Utils;
using System.Net;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;


public interface IGameRepository : IRepository<Game>
{
}
public class GameRepository : Repository<Game>, IGameRepository
{
    private readonly ApplicationDbContext _db;
    public GameRepository(ApplicationDbContext db) : base(db)
    {
        _db = db;
    }

    public override async Task<IEnumerable<Game>> GetAllAsync(Expression<Func<Game, bool>>? filter = null)
    {
        IQueryable<Game> query = _db.Games;
        if (filter != null)
        {
            query = query.Where(filter);
        }
        query = query.Include(g => g.Genres);
        return await query.ToListAsync();
    }

    public override async Task<Game> GetOneAsync(Expression<Func<Game, bool>>? filter = null)
    {
        IQueryable<Game> query = _db.Games;
        if (filter != null)
        {
            query = query.Where(filter);
        }
        query = query.Include(g => g.Genres);
        return await query.FirstOrDefaultAsync();
    }
}
