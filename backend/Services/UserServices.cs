using System;

namespace GameCore.Services;

using GameCore.Repositories;
using GameCore.Models.User;
using GameCore.Models.User.DTO;
using GameCore.Utils;
using AutoMapper;
using System.Net;
using GameCore.Enums;

public class UserServices
{
    private readonly IUserRepository _repo;
    private readonly IMapper _mapper;
    private readonly IEncoderServices _encoderServices;
    private readonly RolServices _roleServices;

    public UserServices(IUserRepository repo, IMapper mapper, IEncoderServices encoderServices, RolServices roleServices)
    {
        _repo = repo;
        _mapper = mapper;
        _encoderServices = encoderServices;
        _roleServices = roleServices;
    }

    async public Task<List<UserWithoutPassDTO>> GetAll()
    {
        var users = await _repo.GetAll();
        return _mapper.Map<List<UserWithoutPassDTO>>(users);
    }

    async public Task<User> GetOneByUsername(string? username)
    {
        if (string.IsNullOrEmpty(username))
        {
            throw new HttpResponseError(HttpStatusCode.BadRequest, "Username is empty");
        }

        var user = await _repo.GetOne(x => x.Username == username);
        return user;
    }

    async public Task<UserWithoutPassDTO> CreateOne(RegisterDTO register)
    {
        var user = _mapper.Map<User>(register);

        user.Password = _encoderServices.Encode(user.Password);

        var role = await _roleServices.GetOneByName(ROLE.USER);
        user.Rol = role;

        await _repo.CreateOne(user);

        return _mapper.Map<UserWithoutPassDTO>(user);
    }
}
