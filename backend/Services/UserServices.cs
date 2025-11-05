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

    async public Task<UserListPagedResultDTO> GetAllAsync(UserListParametersDTO? parameters)
    {
        var query = await _repo.GetQueryAsync();
        var result = new UserListPagedResultDTO();
        if (parameters != null)
        {
            if (parameters.Username != null)
            {
                query = query.Where(u => u.Username.Contains(parameters.Username));
            }
            if (parameters.Email != null)
            {
                query = query.Where(u => u.Email.Contains(parameters.Email));
            }
            if (parameters.RolId != null)
            {
                query = query.Where(u => u.RolId == parameters.RolId);
            }
            if (parameters.IsActive != null)
            {
                query = query.Where(u => u.IsActive == parameters.IsActive);
            }
            if (parameters.CreatedAfter != null)
            {
                query = query.Where(u => u.CreatedAt > parameters.CreatedAfter);
            }
            //ordenar
            if (parameters.SortBy != null)
            {
                switch (parameters.SortBy)
                {
                    case SORT_BY.USERNAME:
                        query = query.OrderBy(u => u.Username);
                        break;
                    case SORT_BY.EMAIL:
                        query = query.OrderBy(u => u.Email);
                        break;
                    case SORT_BY.CREATED_AT:
                        query = query.OrderBy(u => u.CreatedAt);
                        break;
                    default:
                        query = query.OrderBy(u => u.Username);
                        break;
                }
                if (!parameters.Ascending)
                {
                    query = query.OrderByDescending(u => u.Username);

                }
            }
            result.TotalCount = await query.CountAsync();

            //paginar
            var skip = (parameters.PageNumber - 1) * parameters.PageSize;
            query = query.Skip(skip).Take(parameters.PageSize);
            var users = await query.ToListAsync();
            result.Users = _mapper.Map<List<UserWithoutPassDTO>>(users);
            result.PageNumber = parameters.PageNumber;
            result.PageSize = parameters.PageSize;
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
