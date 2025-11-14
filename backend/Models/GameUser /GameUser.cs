using System;

namespace GameCore.Models.GameUser;

using GameCore.Models.Game;
using GameCore.Models.User;
public class GameUser
{
    public int GameId { get; set; }
    public Game Game { get; set; } = null!;
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    public DateTime BuyDate { get; set; }
    public long TimePlayed { get; set; } = 0;
}
