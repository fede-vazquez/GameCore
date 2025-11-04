using System;

namespace GameCore.Services;

using GameCore.Repositories;
using GameCore.Models.GameUser;
using GameCore.Models.GameUser.DTO;
using GameCore.Utils;
using AutoMapper;
using System.Net;
using GameCore.Models.Game.DTO;

public class GameUserServices
{
    private readonly IGameUserRepository _repo;
    private readonly IMapper _mapper;
    private readonly GameServices _gameServices;
    private readonly UserServices _userServices;

    public GameUserServices(IGameUserRepository repo, IMapper mapper, GameServices gameServices, UserServices userServices)
    {
        _repo = repo;
        _mapper = mapper;
        _gameServices = gameServices;
        _userServices = userServices;
    }
    async public Task<List<GetGameUserDTO>> GetAllAsync()
    {
        var gameUsers = await _repo.GetAllAsync();
        return _mapper.Map<List<GetGameUserDTO>>(gameUsers);

    }
    async public Task<GetGameUserDTO> GetOneByIdAsync(int gameId, int userId)
    {
        // la clave primaria es compuesta por gameId y userId
        var gameUser = await _repo.GetOneAsync(g => g.GameId == gameId && g.UserId == userId);
        if (gameUser == null)
        {
            throw new HttpResponseError(HttpStatusCode.NotFound, $"No hay GameUser con id = {gameId} y {userId}");
        }
        return _mapper.Map<GetGameUserDTO>(gameUser);
    }
    //creamos un metodo que devuelva bool sobre si existe un UserGame
    async public Task<bool> ExistsAsync(int gameId, int userId)
    {
        var gameUser = await _repo.GetOneAsync(g => g.GameId == gameId && g.UserId == userId);
        return gameUser != null;
    }
    // devolver una lista de GameUser por id de juego
    async public Task<List<GetGameUserDTO>> GetGameUsersByGameIdAsync(int gameId)
    {
        var gameUsers = await _repo.GetAllAsync(g => g.GameId == gameId);
        return _mapper.Map<List<GetGameUserDTO>>(gameUsers);
    }
    async public Task<List<GetGameUserDTO>> GetGameUsersByUserIdAsync(int userId)
    {
        var gameUsers = await _repo.GetAllAsync(g => g.UserId == userId);

        return _mapper.Map<List<GetGameUserDTO>>(gameUsers);
    }
    async public Task<int> GetGameUsersCountByGameIdAsync(int gameId)
    {
        var gameUsers = await _repo.GetAllAsync(g => g.GameId == gameId);
        return gameUsers.Count();
    }
    // devolver la cantidad de juegos que tiene un usuario
    async public Task<int> GetGameUsersCountByUserIdAsync(int userId)
    {
        var gameUsers = await _repo.GetAllAsync(g => g.UserId == userId);
        return gameUsers.Count();
    }
    //crear a traves de id de juego y usuario
    async public Task<GetGameUserDTO> CreateOneAsync(int gameId, int userId)
    {
        var game = await _gameServices.GetOneByIdAsync(gameId);
        await _userServices.GetOneByIdAsync(userId);
        if (game == null)
        {
            throw new KeyNotFoundException($"El Juego con ID {gameId} no se encontro");
        }
        var gameUser = new GameUser();
        gameUser.GameId = gameId;
        gameUser.UserId = userId;
        await _repo.CreateOneAsync(gameUser);
        return _mapper.Map<GetGameUserDTO>(gameUser);
    }

}