using System;

namespace GameCore.Repositories;

using GameCore.Models.Game;
using GameCore.Config;
public interface IGameRepository : IRepository<Game>
{ }
public class GameRepository : Repository<Game>, IGameRepository
{
    private readonly ApplicationDbContext _db;
    public GameRepository(ApplicationDbContext db) : base(db)
    {
        _db = db;
    }
}
