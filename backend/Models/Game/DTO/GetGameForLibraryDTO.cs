using GameCore.Models.Developer.DTO;
using GameCore.Models.Genre.DTO;
namespace GameCore.Models.Game.DTO;

public class GetGameForLibraryDTO
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string ImageUrl { get; set; } = null!;
    public decimal Price { get; set; }
    public DateTime ReleaseDate { get; set; }
    public GetDeveloperDTO Developer { get; set; }
    public List<GenreDTO> Genres { get; set; } = new List<GenreDTO>();
    public DateTime BuyDate { get; set; } = DateTime.Now;
    public long TimePlayed { get; set; } = 0;

    public bool IsActive { get; set; }

}
