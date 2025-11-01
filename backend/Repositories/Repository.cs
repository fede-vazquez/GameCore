using System;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using GameCore.Config;

namespace GameCore.Repositories;

public class Repository<T> : IRepository<T> where T : class
{
    private readonly ApplicationDbContext _db;
    internal DbSet<T> dbSet;

    public Repository(ApplicationDbContext db)
    {
        _db = db;
        dbSet = _db.Set<T>();
    }

    async public Task CreateOne(T entity)
    {
        await dbSet.AddAsync(entity);
        await Save();
    }

    async public Task DeleteOne(T entity)
    {
        dbSet.Remove(entity);
        await Save();
    }

    async public Task UpdateOne(T entity)
    {
        dbSet.Update(entity);
        await Save();
    }

    async public Task<T> GetOne(Expression<Func<T, bool>>? filter = null)
    {
        IQueryable<T> query = dbSet;
        if (filter != null)
        {
            query = query.Where(filter);
        }
        return await query.FirstOrDefaultAsync();
    }

    async public Task<IEnumerable<T>> GetAll(Expression<Func<T, bool>>? filter = null)
    {
        IQueryable<T> query = dbSet;
        if (filter != null)
        {
            query = query.Where(filter);
        }
        return await query.ToListAsync();
    }

    async public Task Save() => await _db.SaveChangesAsync();

}
