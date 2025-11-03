using System;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using GameCore.Config;
using GameCore.Utils;
using System.Net;


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

    async public Task CreateOneAsync(T entity)
    {
        await dbSet.AddAsync(entity);
        await SaveAsync();
    }

    async public Task DeleteOneAsync(T entity)
    {
        dbSet.Remove(entity);
        await SaveAsync();
    }

    async public Task UpdateOneAsync(T entity)
    {
        dbSet.Update(entity);
        await SaveAsync();
    }

    async public virtual Task<T> GetOneAsync(Expression<Func<T, bool>>? filter = null)
    {
        IQueryable<T> query = dbSet;
        if (filter != null)
        {
            query = query.Where(filter);
        }
        var res = await query.FirstOrDefaultAsync();
        return res;
    }

    async public virtual Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>>? filter = null)
    {
        IQueryable<T> query = dbSet;
        if (filter != null)
        {
            query = query.Where(filter);
        }
        return await query.ToListAsync();
    }

    async public Task SaveAsync() => await _db.SaveChangesAsync();

}
