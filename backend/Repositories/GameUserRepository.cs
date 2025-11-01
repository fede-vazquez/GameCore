using System;

namespace GameCore.Repositories;

using GameCore.Models.GameUser;
using GameCore.Config;
public interface IGameUserRepository : IRepository<GameUser> { }

public class GameUserRepository : Repository<GameUser>, IGameUserRepository
{
    private readonly ApplicationDbContext _db;
    public GameUserRepository(ApplicationDbContext db) : base(db)
    {
        _db = db;
    }

}
