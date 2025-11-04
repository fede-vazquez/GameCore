using System;

namespace GameCore.Models.Game.DTO;

public class CreateGameDTO
{
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string ImageUrl { get; set; } = null!;
    public decimal Price { get; set; }
    public DateTime ReleaseDate { get; set; }
    public int DeveloperId { get; set; }
    public List<int> GenreIds { get; set; } = new List<int>();
    public bool IsActive { get; set; }

}
