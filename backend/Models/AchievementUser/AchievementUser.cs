using System;

namespace GameCore.Models.AchievementUser;
using GameCore.Models.User;
using GameCore.Models.Achievement;
public class AchievementUser
{
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    public int AchievementId { get; set; }
    public Achievement Achievement { get; set; } = null!;
    public DateTime DateAchieved { get; set; } = DateTime.UtcNow;
}
