using System;

namespace GameCore.Services;

using GameCore.Models.Rol;
using GameCore.Models.Rol.DTO;
using GameCore.Repositories;
using GameCore.Utils;
using AutoMapper;
public class RolServices
{
    private readonly IRolRepository _roleRepository;
    private readonly IMapper _mapper;
    public RolServices(IRolRepository roleRepository, IMapper mapper)
    {
        _roleRepository = roleRepository;
        _mapper = mapper;
    }
    public Task<Rol> GetOneByNameAsync(string name)
    {
        var rol = _roleRepository.GetOneAsync(r => r.Name == name);
        if (rol == null)
        {
            throw new HttpResponseError(System.Net.HttpStatusCode.NotFound, "Rol no encontrado");
        }
        return rol;
    }
    public Task<Rol> GetOneByIdAsync(int id)
    {
        var rol = _roleRepository.GetOneAsync(r => r.Id == id);
        if (rol == null)
        {
            throw new HttpResponseError(System.Net.HttpStatusCode.NotFound, "Rol no encontrado");
        }
        return rol;
    }
    public async Task<List<GetRolDTO>> GetAllAsync()
    {
        var roles = await _roleRepository.GetAllAsync();
        return _mapper.Map<List<GetRolDTO>>(roles);
    }

}
