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
    public Task<IQueryable<Game>> GetGameQueryAsync();
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

    //public async GetAllFiltered()

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
    //devuelve un query de games para manejarla consulta en el servicio
    public async Task<IQueryable<Game>> GetGameQueryAsync()
    {
        return _db.Games;
    }

    //aca devuelvo una query para seguir manejando la consulta en el servicio de Game
    /*public async Task<IQueryable<Game>> GetFilteredAsync(List<Expression<Func<Game, bool>>>? filters = null)
    {
        IQueryable<Game> query = _db.Games;
        if (filters != null)
        {
            foreach (var filter in filters)
            {
                if (filter != null)
                {
                    query = query.Where(filter);
                }
            }
        }
        query = query.Include(g => g.Genres);
        return query;
    }*/
}
