using System;

namespace GameCore.Repositories;

using GameCore.Models.Developer;
using GameCore.Config;
public interface IDeveloperRepository : IRepository<Developer> { }
public class DeveloperRepository : Repository<Developer>, IDeveloperRepository
{
    private readonly ApplicationDbContext _db;
    public DeveloperRepository(ApplicationDbContext db) : base(db)
    {
        _db = db;
    }
}
