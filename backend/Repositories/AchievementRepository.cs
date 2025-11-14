using System;

namespace GameCore.Repositories;

using GameCore.Models.Achievement;
using GameCore.Config;
public interface IAchievementRepository : IRepository<Achievement> { }
public class AchievementRepository : Repository<Achievement>, IAchievementRepository
{
    private readonly ApplicationDbContext _db;
    public AchievementRepository(ApplicationDbContext db) : base(db)
    {
        _db = db;
    }

}
