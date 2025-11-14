
namespace GameCore.Services;

using GameCore.Models.Game;
using GameCore.Models.Game.DTO;
using System.Net;
using AutoMapper;
using GameCore.Utils;
using GameCore.Repositories;
using GameCore.Specifications;

public class GameServices
{
    private readonly IGameRepository _repo;
    private readonly DeveloperServices _developerServices;
    private readonly GenreServices _genreServices;
    private readonly IGameSpecificationFactory _gameSpecificationFactory;


    private readonly IMapper _mapper;
    public GameServices(IGameRepository repo, IMapper mapper, DeveloperServices developerServices, GenreServices genreServices, IGameSpecificationFactory gameSpecificationFactory)
    {
        _repo = repo;
        _mapper = mapper;
        _developerServices = developerServices;
        _genreServices = genreServices;
        _gameSpecificationFactory = gameSpecificationFactory;
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
    async public Task<GameListPagedResultDTO> GetAllAsync(GameListParametersDTO? parameters)
    {
        var spec = _gameSpecificationFactory.CreateGameFilterSpecification(parameters);
        var games = await _repo.GetAllAsync(spec);
        var result = new GameListPagedResultDTO();
        result.Items = _mapper.Map<List<GetGameDTO>>(games);
        var count = await _repo.GetCountAsync(spec);
        result.TotalCount = count;
        result.TotalPages = (int)Math.Ceiling((double)count / parameters.PageSize);
        if (parameters != null)
        {
            result.PageNumber = parameters.PageNumber;
            result.PageSize = parameters.PageSize;
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

    async public Task<GetGameDTO> CreateOneAsync(CreateGameDTO createGameDTO)
    {
        //el titulo del juego no puede ser vacio
        if (createGameDTO.Title == null)
        {
            throw new HttpResponseError(HttpStatusCode.BadRequest, "El titulo no puede estar vacio");
        }
        //si ya existe juego con ese title tira error
        if (await _repo.GetOneAsync(x => x.Title == createGameDTO.Title) != null)
        {
            throw new HttpResponseError(HttpStatusCode.BadRequest, "Ya existe un juego con ese titulo");
        }
        //el precio no puede ser negativo
        if (createGameDTO.Price < 0)
        {
            throw new HttpResponseError(HttpStatusCode.BadRequest, "El precio no puede ser negativo");
        }
        //el precio debe ser mayor a 0.50
        if (createGameDTO.Price < (decimal)0.50)
        {
            throw new HttpResponseError(HttpStatusCode.BadRequest, "El precio debe ser mayor a 0.50");
        }
        //el metacriticScore debe estar entre 0 y 100
        if (createGameDTO.MetacriticScore < 0 || createGameDTO.MetacriticScore > 100)
        {
            throw new HttpResponseError(HttpStatusCode.BadRequest, "El metacriticScore debe estar entre 0 y 100");
        }
        //debe ser obligatorio agregar un developer
        if (createGameDTO.DeveloperId == 0)
        {
            throw new HttpResponseError(HttpStatusCode.BadRequest, "Debes agregar un desarrollador");
        }
        //el desarrollador debe existir
        var developer = await _developerServices.GetOneByIdAsync(createGameDTO.DeveloperId);

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
        //el titulo del juego no puede ser vacio
        if (updateDTO.Title == null)
        {
            throw new HttpResponseError(HttpStatusCode.BadRequest, "El titulo no puede estar vacio");
        }
        //verificamos que no exista un juego con ese title
        if (await _repo.GetOneAsync(x => x.Title == updateDTO.Title && x.Id != id) != null)
        {
            throw new HttpResponseError(HttpStatusCode.BadRequest, "Ya existe un juego con ese titulo");
        }
        //el precio no puede ser negativo
        if (updateDTO.Price < 0)
        {
            throw new HttpResponseError(HttpStatusCode.BadRequest, "El precio no puede ser negativo");
        }
        //el precio debe ser mayor a 0.50
        if (updateDTO.Price < (decimal)0.50)
        {
            throw new HttpResponseError(HttpStatusCode.BadRequest, "El precio debe ser mayor a 0.50");
        }
        //el metacriticScore debe estar entre 0 y 100
        if (updateDTO.MetacriticScore < 0 || updateDTO.MetacriticScore > 100)
        {
            throw new HttpResponseError(HttpStatusCode.BadRequest, "El metacriticScore debe estar entre 0 y 100");
        }
        //debe ser obligatorio agregar un developer
        if (updateDTO.DeveloperId == 0)
        {
            throw new HttpResponseError(HttpStatusCode.BadRequest, "Debes agregar un desarrollador");
        }
        //el desarrollador debe existir
        var developer = await _developerServices.GetOneByIdAsync(updateDTO.DeveloperId);
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
