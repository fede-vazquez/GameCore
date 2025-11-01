using System;

namespace GameCore.Models.User;

using GameCore.Models.Rol;
using GameCore.Models.GameUser;
using GameCore.Models.AchievementUser;
using GameCore.Models.Order;
public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public bool IsActive { get; set; } = false;
    public int RolId { get; set; }
    public Rol Rol { get; set; } = null!;
    public ICollection<GameUser> GameUsers { get; set; } = new List<GameUser>();
    public
    ICollection<AchievementUser> AchievementUsers
    { get; set; } = new List<AchievementUser>();
    public ICollection<Order> Orders { get; set; } = new List<Order>();
}
