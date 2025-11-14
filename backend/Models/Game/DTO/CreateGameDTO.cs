using System;
using System.ComponentModel.DataAnnotations;

namespace GameCore.Models.Game.DTO;

public class CreateGameDTO
{
    [Required]
    public string Title { get; set; } = null!;
    [MaxLength(500)]
    public string Description { get; set; } = null!;
    public string ImageUrl { get; set; } = null!;
    public decimal Price { get; set; }
    public int? MetacriticScore { get; set; }
    public DateTime ReleaseDate { get; set; }
    [Required]
    public int DeveloperId { get; set; }
    public List<int> GenreIds { get; set; } = new List<int>();
    public bool IsActive { get; set; }

}
