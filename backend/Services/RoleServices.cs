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
    public Task<Rol> GetOneByName(string name)
    {
        var rol = _roleRepository.GetOne(r => r.Name == name);
        if (rol == null)
        {
            throw new HttpResponseError(System.Net.HttpStatusCode.NotFound, "Rol no encontrado");
        }
        return rol;
    }

}
