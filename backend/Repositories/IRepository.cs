using System;

namespace GameCore.Repositories;

using System.Linq.Expressions;
public interface IRepository<T> where T : class
{
    Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>>? filter = null);
    Task<T> GetOneAsync(Expression<Func<T, bool>>? filter = null);
    Task CreateOneAsync(T entity);
    Task UpdateOneAsync(T entity);
    Task DeleteOneAsync(T entity);
    Task SaveAsync();
}
