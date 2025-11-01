using System;

namespace GameCore.Repositories;

using GameCore.Models.Discount;
using GameCore.Config;
public interface IDiscountRepository : IRepository<Discount> { }

public class DiscountRepository : Repository<Discount>, IDiscountRepository
{
    private readonly ApplicationDbContext _db;
    public DiscountRepository(ApplicationDbContext db) : base(db)
    {
        _db = db;
    }
}