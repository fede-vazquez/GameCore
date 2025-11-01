using System;

namespace GameCore.Models.Achievement;

using GameCore.Models.Game;
using GameCore.Models.AchievementUser;
public class Achievement
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public int GameId { get; set; }
    public Game Game { get; set; } = null!;
    public ICollection<AchievementUser> AchievementUsers { get; set; } = new List<AchievementUser>();

}
