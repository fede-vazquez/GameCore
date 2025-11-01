using System;

namespace GameCore.Models.Developer;

using GameCore.Models.Game;
public class Developer
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public ICollection<Game> Games { get; set; } = new List<Game>();
}
