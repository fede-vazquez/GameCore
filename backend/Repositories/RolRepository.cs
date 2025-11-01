using System;

namespace GameCore.Repositories;

using GameCore.Models.Rol;
using GameCore.Config;
public interface IRolRepository : IRepository<Rol> { }

public class RolRepository : Repository<Rol>, IRolRepository
{
    private readonly ApplicationDbContext _db;
    public RolRepository(ApplicationDbContext db) : base(db)
    {
        _db = db;
    }
}
