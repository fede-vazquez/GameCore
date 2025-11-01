using System;

namespace GameCore.Repositories;

using GameCore.Models.Order;
using GameCore.Config;
public interface IOrderRepository : IRepository<Order> { }
public class OrderRepository : Repository<Order>, IOrderRepository
{
    private readonly ApplicationDbContext _db;
    public OrderRepository(ApplicationDbContext db) : base(db)
    {
        _db = db;
    }

}

