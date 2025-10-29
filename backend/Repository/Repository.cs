using System.Linq.Expressions;
using GameCore.Config;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace GameCore.Repository
{
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAll(Expression<Func<T, bool>>? filter = null);
        Task<T> GetOne(Expression<Func<T, bool>>? filter = null);
        Task CreateOne(T entity);
        Task UpdateOne(T entity);
        Task DeleteOne(T entity);
        Task Save();
    }

    public class Repository<T> : IRepository<T> where T : class
    {

        private readonly ApplicationDbContext _db;

        // private wrap + solo accedido por este projecto
        internal DbSet<T> dbSet { get; set; }

        public Repository(ApplicationDbContext db)
        {
            _db = db;

            // crea un queryable de la entidad pasada
            dbSet = _db.Set<T>();
        }

        //! metodos db
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

        async public Task CreateOne(T entity)
        {
            await dbSet.AddAsync(entity);
            await this.Save();
        }

        async public Task DeleteOne(T entity)
        {
            dbSet.Remove(entity);
            await this.Save();
        }


        async public Task UpdateOne(T entity)
        {
            dbSet.Update(entity);
            await this.Save();
        }

        async public Task Save()
        {
            await _db.SaveChangesAsync();
        }
    }
}