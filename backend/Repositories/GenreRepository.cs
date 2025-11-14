using System;

namespace GameCore.Repositories;

using GameCore.Models.Genre;
using GameCore.Config;
public interface IGenreRepository : IRepository<Genre> { }

public class GenreRepository : Repository<Genre>, IGenreRepository
{
    private readonly ApplicationDbContext _db;
    public GenreRepository(ApplicationDbContext db) : base(db)
    {
        _db = db;
    }
}
