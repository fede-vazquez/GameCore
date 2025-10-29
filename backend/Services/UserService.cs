using AutoMapper;
using GameCore.Models.User;
using GameCore.Repository;
using Microsoft.EntityFrameworkCore.Design;

namespace GameCore.Services
{
    public class UserService
    {
        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;


        public UserService(IUserRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }


        async public Task<User> CreateOne(createUser user)
        {
            var user = _mapper.Map<User>(user)
        }
    }
}