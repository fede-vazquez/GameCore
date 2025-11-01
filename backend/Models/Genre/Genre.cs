using System;

namespace GameCore.Models.Genre;
using GameCore.Models.Game;
using GameCore.Models.GameUser;
public class Genre
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public ICollection<Game> Games { get; set; } = new List<Game>();
}
