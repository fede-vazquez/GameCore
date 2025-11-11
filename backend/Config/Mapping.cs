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
using GameCore.Models.Order;
using GameCore.Models.Order.DTO;
using GameCore.Models.GameUser;
using GameCore.Models.GameUser.DTO;
using GameCore.Models.Discount;
using GameCore.Models.Discount.DTO;
using GameCore.Models.PaymentMethod;
using GameCore.Models.PaymentMethod.DTO;
using GameCore.Models.Rol;
using GameCore.Models.Rol.DTO;
using GameCore.Models.Percentage;
using GameCore.Models.Percentage.DTO;


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
            ).ForMember(
                dest => dest.Developer,
                opt => opt.MapFrom(e => new GetDeveloperDTO { Id = e.Developer.Id, Name = e.Developer.Name })
            ).ForMember(
                dest => dest.Discount,
                opt => opt.MapFrom(e => e.Discounts.OrderByDescending(d => d.Id).FirstOrDefault())
            );
        CreateMap<GameUser, GetGameForLibraryDTO>()
        .ForMember(
            dest => dest.Id,
            opt => opt.MapFrom(e => e.Game.Id)
        )
        .ForMember(
            dest => dest.Title,
            opt => opt.MapFrom(e => e.Game.Title)
        )
        .ForMember(
            dest => dest.Description,
            opt => opt.MapFrom(e => e.Game.Description)
        )
        .ForMember(
            dest => dest.ImageUrl,
            opt => opt.MapFrom(e => e.Game.ImageUrl)
        ).ForMember(
            dest => dest.Genres,
            opt => opt.MapFrom(e => e.Game.Genres.Select(g => new GenreDTO { Id = g.Id, Name = g.Name }).ToList())
        ).ForMember(
            dest => dest.ReleaseDate,
            opt => opt.MapFrom(e => e.Game.ReleaseDate)
        ).ForMember(
            dest => dest.Price,
            opt => opt.MapFrom(e => e.Game.Price)
        ).ForMember(
            dest => dest.Developer,
            opt => opt.MapFrom(e => new GetDeveloperDTO { Id = e.Game.Developer.Id, Name = e.Game.Developer.Name })
        ).ForMember(
            dest => dest.IsActive,
            opt => opt.MapFrom(e => e.Game.IsActive)
        );

        CreateMap<GetGameDTO, Game>();
        CreateMap<UpdateUserRoleDTO, User>();
        //Order
        CreateMap<CreateOrderDTO, Order>().ReverseMap();
        CreateMap<Order, GetOrderDTO>().ReverseMap();
        CreateMap<Order, GetOrderForUserDTO>()
        .ForMember(
            dest => dest.GameTitle,
            opt => opt.MapFrom(e => e.Game.Title)
        )
        .ForMember(
            dest => dest.PaymentMethodName,
            opt => opt.MapFrom(e => e.PaymentMethod.Name)
        );
        CreateMap<Order, GetOrderForAdminDTO>()
       .ForMember(
           dest => dest.GameTitle,
           opt => opt.MapFrom(e => e.Game.Title)
       )
       .ForMember(
           dest => dest.PaymentMethodName,
           opt => opt.MapFrom(e => e.PaymentMethod.Name)
       )
       .ForMember(
           dest => dest.UserName,
           opt => opt.MapFrom(e => e.User.Username)
       );
        //UserGame
        CreateMap<GameUser, GetGameUserDTO>().ReverseMap();
        //Discount
        CreateMap<CreateDiscountDTO, Discount>();
        CreateMap<Discount, GetDiscountDTO>().ForMember(dest => dest.GameTitle, opt => opt.MapFrom(e => e.Game.Title)).ForMember(dest => dest.PercentageValue, opt => opt.MapFrom(e => e.Percentage.Value));
        CreateMap<Discount, GetDiscountForGameDTO>().ForMember(dest => dest.PercentageValue, opt => opt.MapFrom(e => e.Percentage.Value));
        //Payment Method
        CreateMap<PaymentMethod, GetPaymentMethod>();
        //Rol
        CreateMap<Rol, GetRolDTO>();
        //Percentages
        CreateMap<Percentage, GetPercentageDTO>();
    }
}
