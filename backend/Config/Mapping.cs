using System;

namespace GameCore.Config;

using AutoMapper;
using GameCore.Models;
using GameCore.Models.User.DTO;
using GameCore.Models.User;

public class Mapping : Profile
{
    public Mapping()
    {
        CreateMap<int?, int>().ConvertUsing((src, dest) => src ?? dest);
        CreateMap<bool?, bool>().ConvertUsing((src, dest) => src ?? dest);
        CreateMap<string?, string>().ConvertUsing((src, dest) => src ?? dest);
        //Auth
        CreateMap<RegisterDTO, User>();
        CreateMap<User, UserWithoutPassDTO>();
    }

}
