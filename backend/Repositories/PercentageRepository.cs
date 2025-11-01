using System;

namespace GameCore.Repositories;

using GameCore.Models.Percentage;
using GameCore.Config;
public interface IPercentageRepository : IRepository<Percentage> { }
public class PercentageRepository : Repository<Percentage>, IPercentageRepository
{
    private readonly ApplicationDbContext _db;
    public PercentageRepository(ApplicationDbContext db) : base(db)
    {
        _db = db;
    }
}
