using System;

namespace GameCore.Models.Game;

using GameCore.Models.Developer;
using GameCore.Models.Genre;
using GameCore.Models.Achievement;
using GameCore.Models.GameUser;
using GameCore.Models.Order;
using GameCore.Models.Discount;
using System.Reflection;

public class Game
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string ImageUrl { get; set; } = null!;
    public int? MetacriticScore { get; set; }
    public DateTime ReleaseDate { get; set; }
    public decimal Price { get; set; }
    public int DeveloperId { get; set; }
    public Developer Developer { get; set; } = null!;
    public ICollection<Genre> Genres { get; set; } = new List<Genre>();
    public bool IsActive { get; set; } = false;

    public ICollection<Achievement> Achievements { get; set; } = new List<Achievement>();
    public ICollection<GameUser> GameUsers { get; set; } = new List<GameUser>();
    public ICollection<Order> Orders { get; set; } = new List<Order>();
    public ICollection<Discount> Discounts { get; set; } = new List<Discount>();

}
