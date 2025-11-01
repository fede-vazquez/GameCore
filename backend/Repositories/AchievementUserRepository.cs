using System;

namespace GameCore.Repositories;

using GameCore.Models.AchievementUser;
using GameCore.Config;
public interface IAchievementUserRepository : IRepository<AchievementUser> { }

public class AchievementUserRepository : Repository<AchievementUser>, IAchievementUserRepository
{
    private readonly ApplicationDbContext _db;
    public AchievementUserRepository(ApplicationDbContext db) : base(db)
    {
        _db = db;
    }

}
