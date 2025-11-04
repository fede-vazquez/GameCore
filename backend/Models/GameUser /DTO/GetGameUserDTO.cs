using System;
using GameCore.Models.Game.DTO;

namespace GameCore.Models.GameUser.DTO;

public class GetGameUserDTO
{
    public int GameId { get; set; }
    public DateTime BuyDate { get; set; }
    public long TimePlayed { get; set; } = 0;
}
