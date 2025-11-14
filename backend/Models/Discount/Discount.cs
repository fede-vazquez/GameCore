using System;

namespace GameCore.Models.Discount;

using GameCore.Models.Game;
using GameCore.Models.Percentage;
public class Discount
{
    public int Id { get; set; }
    public int GameId { get; set; }
    public Game Game { get; set; } = null!;
    public int PercentageId { get; set; }
    public Percentage Percentage { get; set; } = null!;
    public DateTime StartDate { get; set; } = DateTime.UtcNow;
    public DateTime EndDate { get; set; }
}
