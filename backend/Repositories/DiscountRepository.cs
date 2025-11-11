using System;

namespace GameCore.Repositories;

using GameCore.Models.Discount;
using GameCore.Config;
using Microsoft.EntityFrameworkCore;
using GameCore.Specifications;

public interface IDiscountRepository : IRepository<Discount>
{
    public Task<IEnumerable<Discount>> GetAllOrdersAsync(ISpecification<Discount> spec);
    public Task<int> GetCountAsync(ISpecification<Discount> spec);
}

public class DiscountRepository : Repository<Discount>, IDiscountRepository
{
    private readonly ApplicationDbContext _db;
    public DiscountRepository(ApplicationDbContext db) : base(db)
    {
        _db = db;
    }
    public async Task<IEnumerable<Discount>> GetAllOrdersAsync(ISpecification<Discount> spec)
    {
        var filteredQuery = SpecificationEvaluator.GetFilteredQuery(_db.Discounts, spec);
        var paginatedQuery = SpecificationEvaluator.ApplyPaging(filteredQuery, spec);
        return await paginatedQuery.ToListAsync();
    }
    public async Task<int> GetCountAsync(ISpecification<Discount> spec)
    {
        return await SpecificationEvaluator.GetFilteredQuery(_db.Discounts, spec).CountAsync();
    }
}