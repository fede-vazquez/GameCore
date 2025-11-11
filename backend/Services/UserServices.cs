using System;

namespace GameCore.Services;

using GameCore.Repositories;
using GameCore.Models.User;
using GameCore.Models.User.DTO;
using GameCore.Utils;
using AutoMapper;
using System.Net;
using GameCore.Enums;
using Microsoft.EntityFrameworkCore;
using GameCore.Specifications;

public class UserServices
{
    private readonly IUserRepository _repo;
    private readonly IMapper _mapper;
    private readonly IEncoderServices _encoderServices;
    private readonly RolServices _roleServices;

    private readonly ISpecificationUserFactory _specFactory = new UserSpecificationFactory();

    public UserServices(IUserRepository repo, IMapper mapper, IEncoderServices encoderServices, RolServices roleServices, ISpecificationUserFactory specFactory)
    {
        _repo = repo;
        _mapper = mapper;
        _encoderServices = encoderServices;
        _roleServices = roleServices;
        _specFactory = specFactory;
    }

    async public Task<UserListPagedResultDTO> GetAllAsync(UserListParametersDTO? parameters)
    {
        var result = new UserListPagedResultDTO();

        if (parameters != null)
        {
            var spec = _specFactory.CreateUserFilterSpecification(parameters);

            var users = await _repo.GetAllAsync(spec);
            result.Users = _mapper.Map<List<UserWithoutPassDTO>>(users);
            var count = await _repo.GetCountAsync(spec);
            result.TotalCount = count;
            result.TotalPages = (int)Math.Ceiling((double)count / parameters.PageSize);
            if (parameters != null)
            {
                result.PageNumber = parameters.PageNumber;
                result.PageSize = parameters.PageSize;
            }
        }
        else
        {
            throw new HttpResponseError(HttpStatusCode.BadRequest, "Parametros invalidos");
        }
        return result;
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
    async public Task<UserWithoutPassDTO> GetOneByIdAsync(int id)
    {
        var user = await _repo.GetOneAsync(x => x.Id == id);
        return _mapper.Map<UserWithoutPassDTO>(user);
    }

    async public Task<UserWithoutPassDTO> CreateOneAsync(RegisterDTO register)
    {
        var user = _mapper.Map<User>(register);

        user.Password = _encoderServices.Encode(user.Password);

        var role = await _roleServices.GetOneByNameAsync(ROLE.ADMIN);
        user.Rol = role;

        await _repo.CreateOneAsync(user);

        return _mapper.Map<UserWithoutPassDTO>(user);
    }

    // actualizar un usuario
    async public Task<UserWithoutPassDTO> UpdateRoleByUsernameAsync(string username, UpdateUserRoleDTO updateDTO)
    {
        var user = await GetOneByUsernameAsync(username);

        _mapper.Map(updateDTO, user);

        await _repo.UpdateOneAsync(user);

        return _mapper.Map<UserWithoutPassDTO>(user);
    }

}
