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

    async public Task<List<UserWithoutPassDTO>> GetAllAsync()
    {
        var users = await _repo.GetAllAsync();
        return _mapper.Map<List<UserWithoutPassDTO>>(users);
    }

    async public Task<User> GetOneByUsernameAsync(string username)
    {
        if (string.IsNullOrEmpty(username))
        {
            throw new HttpResponseError(HttpStatusCode.BadRequest, "Username is empty");
        }

        var user = await _repo.GetOneAsync(x => x.Username == username);
        return user;
    }

    async public Task<UserWithoutPassDTO> CreateOneAsync(RegisterDTO register)
    {
        var user = _mapper.Map<User>(register);

        user.Password = _encoderServices.Encode(user.Password);

        var role = await _roleServices.GetOneByNameAsync(ROLE.USER);
        user.Rol = role;

        await _repo.CreateOneAsync(user);

        return _mapper.Map<UserWithoutPassDTO>(user);
    }
}
