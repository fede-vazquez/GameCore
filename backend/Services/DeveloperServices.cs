using System;
using AutoMapper;

namespace GameCore.Services;

using GameCore.Repositories;
using GameCore.Models.Developer;
using GameCore.Models.Developer.DTO;
using GameCore.Utils;
using System.Net;
using System.Threading.Tasks;
using System.Collections.Generic;

public class DeveloperServices
{
    private readonly IDeveloperRepository _repo;
    private readonly IMapper _mapper;
    public DeveloperServices(IDeveloperRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }
    async private Task<GetDeveloperDTO> GetOneByIdOrExceptionAsync(int id)
    {
        var dev = await _repo.GetOneAsync(p => p.Id == id);
        if (dev == null)
        {
            throw new HttpResponseError(HttpStatusCode.NotFound, $"No hay Devs con id = {id}");
        }
        return _mapper.Map<GetDeveloperDTO>(dev);
    }
    async private Task<Developer> GetOneEntityByIdOrExceptionAsync(int id)
    {
        var dev = await _repo.GetOneAsync(p => p.Id == id);
        if (dev == null)
        {
            throw new HttpResponseError(HttpStatusCode.NotFound, $"No hay Devs con id = {id}");
        }
        return dev;
    }

    async public Task<List<GetDeveloperDTO>> GetAllAsync()
    {
        var devs = await _repo.GetAllAsync();
        return _mapper.Map<List<GetDeveloperDTO>>(devs);
    }

    async public Task<GetDeveloperDTO> GetOneByIdAsync(int id) => await GetOneByIdOrExceptionAsync(id);

    async public Task<GetDeveloperDTO> CreateOneAsync(CreateDeveloperDTO createDTO)
    {
        //si el nombre es vacio tira error
        if (createDTO.Name == null)
        {
            throw new HttpResponseError(HttpStatusCode.BadRequest, "El nombre no puede estar vacio");
        }
        //si ya existe dev con ese nombre tira error
        if (await _repo.GetOneAsync(x => x.Name == createDTO.Name) != null)
        {
            throw new HttpResponseError(HttpStatusCode.BadRequest, "Ya existe un developer con ese nombre");
        }
        var dev = _mapper.Map<Developer>(createDTO);

        await _repo.CreateOneAsync(dev);

        return _mapper.Map<GetDeveloperDTO>(dev);
    }

    async public Task<GetDeveloperDTO> UpdateOneByIdAsync(int id, UpdateDeveloperDTO updateDTO)
    {
        //si el nombre es vacio tira error
        if (updateDTO.Name == null)
        {
            throw new HttpResponseError(HttpStatusCode.BadRequest, "El nombre no puede estar vacio");
        }
        //si ya existe dev con ese nombre tira error
        if (await _repo.GetOneAsync(x => x.Name == updateDTO.Name) != null)
        {
            throw new HttpResponseError(HttpStatusCode.BadRequest, "Ya existe un developer con ese nombre");
        }
        var dev = await GetOneEntityByIdOrExceptionAsync(id);
        dev.Name = updateDTO.Name;
        await _repo.UpdateOneAsync(dev);
        return _mapper.Map<GetDeveloperDTO>(dev);
    }

    async public Task DeleteOneByIdAsync(int id)
    {
        var dev = await GetOneEntityByIdOrExceptionAsync(id);
        await _repo.DeleteOneAsync(dev);
    }

}
