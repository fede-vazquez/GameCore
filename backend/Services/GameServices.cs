using System;
using GameCore.Repositories;

namespace GameCore.Services;

using GameCore.Models.Game;
using GameCore.Models.Game.DTO;
using System.Net;
using AutoMapper;
using GameCore.Utils;
using GameCore.Repositories;
using GameCore.Models.Genre;
using Microsoft.EntityFrameworkCore;

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

    async public Task<List<GetGameDTO>> GetAllAsync()
    {
        var games = await _repo.GetAllAsync();

        return _mapper.Map<List<GetGameDTO>>(games);
    }

    async public Task<GetGameDTO> GetOneByIdAsync(int id)
    {
        var game = await GetOneByIdOrException(id);
        return _mapper.Map<GetGameDTO>(game);
    }

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
