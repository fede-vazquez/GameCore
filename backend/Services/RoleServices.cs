using System;

namespace GameCore.Services;

using GameCore.Models.Rol;
using GameCore.Repositories;
using GameCore.Utils;

public class RolServices
{
    private readonly IRolRepository _roleRepository;
    public RolServices(IRolRepository roleRepository)
    {
        _roleRepository = roleRepository;
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

}
