using System;

namespace GameCore.Repositories;

using GameCore.Models.Order;
using GameCore.Config;
using GameCore.Specifications;
using Microsoft.EntityFrameworkCore;
public interface IOrderRepository : IRepository<Order>
{
    public Task<IEnumerable<Order>> GetAllAsync(ISpecification<Order> spec);
    public Task<int> GetCountAsync(ISpecification<Order> spec);
}
public class OrderRepository : Repository<Order>, IOrderRepository
{
    private readonly ApplicationDbContext _db;
    public OrderRepository(ApplicationDbContext db) : base(db)
    {
        _db = db;
    }

    public async Task<IEnumerable<Order>> GetAllAsync(ISpecification<Order> spec = null)
    {
        var filteredQuery = SpecificationEvaluator.GetFilteredQuery(_db.Orders, spec);
        var paginatedQuery = SpecificationEvaluator.ApplyPaging(filteredQuery, spec);
        return await paginatedQuery.ToListAsync();
    }
    public async Task<int> GetCountAsync(ISpecification<Order> spec)
    {
        return await SpecificationEvaluator.GetFilteredQuery(_db.Orders, spec).CountAsync();
    }
}

