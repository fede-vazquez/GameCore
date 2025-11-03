using System;

namespace GameCore.Config;

using AutoMapper;
using GameCore.Models;
using GameCore.Models.User.DTO;
using GameCore.Models.User;
using GameCore.Models.Genre.DTO;
using GameCore.Models.Genre;
using GameCore.Models.Developer.DTO;
using GameCore.Models.Developer;
using GameCore.Models.Game.DTO;
using GameCore.Models.Game;

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
        //Genre
        CreateMap<Genre, GenreDTO>();
        CreateMap<GenreDTO, Genre>();
        //Developer
        CreateMap<Developer, GetDeveloperDTO>();
        CreateMap<CreateDeveloperDTO, Developer>();
        CreateMap<Developer, GetDeveloperDTO>();
        CreateMap<GetDeveloperDTO, Developer>();
        //Game
        CreateMap<CreateGameDTO, Game>();
        CreateMap<UpdateGameDTO, Game>();
        CreateMap<Game, GetGameDTO>()
            .ForMember(
                dest => dest.Genres,
                opt => opt.MapFrom(e => e.Genres.Select(g => new GenreDTO { Id = g.Id, Name = g.Name }).ToList())
            );
        CreateMap<GetGameDTO, Game>();
        CreateMap<UpdateUserRoleDTO, User>();
    }

}
