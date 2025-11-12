using System;

namespace GameCore.Models.Game.DTO;

using GameCore.Models.Achievement.DTO;
using GameCore.Models.Developer.DTO;
using GameCore.Models.Discount.DTO;
using GameCore.Models.Genre.DTO;
public class GetGameDTO
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string ImageUrl { get; set; } = null!;
    public decimal Price { get; set; }
    public int? MetacriticScore { get; set; }
    public DateTime ReleaseDate { get; set; }
    public GetDeveloperDTO Developer { get; set; }
    public GetDiscountForGameDTO Discount { get; set; }
    public List<GenreDTO> Genres { get; set; } = new List<GenreDTO>();
    public List<GetAchievementForGameDTO> Achievements { get; set; } = new List<GetAchievementForGameDTO>();
    public bool IsActive { get; set; }
}
