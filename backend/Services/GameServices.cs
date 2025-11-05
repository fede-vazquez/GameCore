using System;
using GameCore.Repositories;

namespace GameCore.Services;

using GameCore.Models.Game;
using GameCore.Models.Game.DTO;
using System.Net;
using AutoMapper;
using GameCore.Utils;
using GameCore.Repositories;
using Microsoft.EntityFrameworkCore;
using GameCore.Enums;


public class GameServices
{
    private readonly IGameRepository _repo;
    private readonly DeveloperServices _developerServices;
    private readonly GenreServices _genreServices;


    private readonly IMapper _mapper;
    public GameServices(IGameRepository repo, IMapper mapper, DeveloperServices developerServices, GenreServices genreServices)
    {
        _repo = repo;
        _mapper = mapper;
        _developerServices = developerServices;
        _genreServices = genreServices;
    }
    async private Task<Game> GetOneByIdOrException(int id)
    {
        var game = await _repo.GetOneAsync(p => p.Id == id);
        if (game == null)
        {
            throw new HttpResponseError(HttpStatusCode.NotFound, $"No hay Juego con id = {id}");
        }
        return game;
    }
    // TODO: refactorizar usando el patron especificacion
    async public Task<GameListPagedResultDTO> GetAllAsync(GameListParametersDTO? parameters, int? userId)
    {
        //obtenemos del repo la query para trabajar con ella
        var query = await _repo.GetGameQueryAsync();
        if (userId != null)
        {
            query = query.Where(g => g.GameUsers.Any(gu => gu.UserId == userId));
        }
        GameListPagedResultDTO result = new GameListPagedResultDTO();
        if (parameters != null)
        {
            if (parameters.Name != null)
            {
                query = query.Where(g => g.Title.Contains(parameters.Name));
            }
            if (parameters.GenreId != null)
            {
                query = query.Where(g => g.Genres.Any(gg => gg.Id == parameters.GenreId));
            }
            if (parameters.DeveloperId != null)
            {
                query = query.Where(g => g.DeveloperId == parameters.DeveloperId);
            }
            //filtrar por el ultimo descuento
            if (parameters.PercentageId != null)
            {
                query = query.Where(g => g.Discounts.OrderByDescending(d => d.Id).FirstOrDefault() != null && g.Discounts.OrderByDescending(d => d.Id).FirstOrDefault().PercentageId == parameters.PercentageId && g.Discounts.OrderByDescending(d => d.Id).FirstOrDefault().EndDate > DateTime.Now && g.Discounts.OrderByDescending(d => d.Id).FirstOrDefault().StartDate < DateTime.Now);
            }
            //ordenar 
            if (parameters.SortBy != null)
            {
                switch (parameters.SortBy)
                {
                    case SORT_BY.TITLE:
                        query = query.OrderBy(g => g.Title);
                        break;
                    case SORT_BY.RELEASE_DATE:
                        query = query.OrderBy(g => g.ReleaseDate);
                        break;
                    default:
                        query = query.OrderBy(g => g.Title);
                        break;
                }
                if (!parameters.Ascending)
                {
                    query = query.OrderByDescending(g => g.Title);
                }

            }
            //paginar
            query = query.Skip((parameters.PageNumber - 1) * parameters.PageSize).Take(parameters.PageSize);
            //incluimos la lista de generos
            query = query.Include(g => g.Genres);

            //ahora obtenemos los juegos con la query
            var games = await query.ToListAsync();
            //armamos el dto de retorno
            //transformamos la lista de juegos en una lista de dtos
            result.Items = _mapper.Map<List<GetGameDTO>>(games);
            result.PageNumber = parameters.PageNumber;
            result.PageSize = parameters.PageSize;
            result.TotalCount = await query.CountAsync();
        }
        else
        {
            throw new HttpResponseError(HttpStatusCode.BadRequest, "Parametros invalidos");
        }

        return result;
    }

    async public Task<GetGameDTO> GetOneByIdAsync(int id)
    {
        var game = await GetOneByIdOrException(id);
        return _mapper.Map<GetGameDTO>(game);
    }
    //dada una lista de juegos crea muchos juegos
    async public Task<List<GetGameDTO>> CreateManyAsync(List<CreateGameDTO> createGameDTOs)
    {
        var games = _mapper.Map<List<Game>>(createGameDTOs);
        await _repo.CreateManyAsync(games);
        return _mapper.Map<List<GetGameDTO>>(games);
    }
    //obtenemos una lista de juegos que tiene un usuario por id
    async public Task<GameListPagedResultDTO> GetGamesByUserIdAsync(int userId) => await GetAllAsync(null, userId);

    async public Task<GetGameDTO> CreateOneAsync(CreateGameDTO createGameDTO)
    {
        //creamos un juego a partir del dto
        var game = _mapper.Map<Game>(createGameDTO);
        //agregamos la lista de generos
        if (createGameDTO.GenreIds != null && createGameDTO.GenreIds.Any())
        {
            var genres = await _genreServices.GetAllEntitiesAsync(g => createGameDTO.GenreIds.Contains(g.Id));
            foreach (var genre in genres)
            {
                game.Genres.Add(genre);
            }

        }
        await _repo.CreateOneAsync(game);
        return _mapper.Map<GetGameDTO>(game);
    }

    async public Task<GetGameDTO> UpdateOneById(int id, UpdateGameDTO updateDTO)
    {
        var game = await GetOneByIdOrException(id);
        //actualizamos el juego a partir del dto
        _mapper.Map(updateDTO, game);

        if (updateDTO.GenreIds != null && updateDTO.GenreIds.Any())
        {
            var genres = await _genreServices.GetAllEntitiesAsync(g => updateDTO.GenreIds.Contains(g.Id));
            game.Genres.Clear();
            foreach (var genre in genres)
            {
                game.Genres.Add(genre);
            }
        }
        else
        {
            game.Genres.Clear();
        }
        await _repo.UpdateOneAsync(game);

        return _mapper.Map<GetGameDTO>(game);
    }

    async public Task DeleteOneById(int id)
    {
        var game = await GetOneByIdOrException(id);
        await _repo.DeleteOneAsync(_mapper.Map<Game>(game));
    }


}
