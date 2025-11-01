using System;

namespace GameCore.Repositories;

using System.Linq.Expressions;
public interface IRepository<T> where T : class
{
    Task<IEnumerable<T>> GetAll(Expression<Func<T, bool>>? filter = null);
    Task<T> GetOne(Expression<Func<T, bool>>? filter = null);
    Task CreateOne(T entity);
    Task UpdateOne(T entity);
    Task DeleteOne(T entity);
    Task Save();
}
