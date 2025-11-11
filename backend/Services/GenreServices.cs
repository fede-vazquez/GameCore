using System;
using AutoMapper;

namespace GameCore.Services;

using GameCore.Repositories;
using GameCore.Models.Genre.DTO;
using GameCore.Models.Genre;
using GameCore.Utils;
using System.Net;
using System.Linq.Expressions;

public class GenreServices
{
    private readonly IGenreRepository _repo;
    private readonly IMapper _mapper;
    public GenreServices(IGenreRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }
    async private Task<GenreDTO> GetOneByIdOrExceptionAsync(int id)
    {

        var genre = await _repo.GetOneAsync(p => p.Id == id);
        if (genre == null)
        {
            throw new HttpResponseError(HttpStatusCode.NotFound, $"No hay hay genero con id = {id}");
        }
        return _mapper.Map<GenreDTO>(genre);
    }
    async public Task<GenreDTO> GetOneByIdAsync(int id) => await GetOneByIdOrExceptionAsync(id);

    async public Task<List<GenreDTO>> GetAllAsync(Expression<Func<Genre, bool>>? filter = null)
    {
        var genres = await _repo.GetAllAsync(filter);

        return _mapper.Map<List<GenreDTO>>(genres);
    }
    async public Task<List<Genre>> GetAllEntitiesAsync(Expression<Func<Genre, bool>>? filter = null)
    {
        var genres = await _repo.GetAllAsync(filter);
        return genres.ToList();
    }

}
