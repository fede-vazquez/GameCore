using System;

namespace GameCore.Models.Game.DTO;

using GameCore.Models.Genre.DTO;
public class GetGameDTO
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string ImageUrl { get; set; } = null!;
    public decimal Price { get; set; }
    public DateTime ReleaseDate { get; set; }
    public int DeveloperId { get; set; }
    public List<GenreDTO> Genres { get; set; } = new List<GenreDTO>();

    public bool IsActive { get; set; }
}
