using System;

namespace GameCore.Models.Discount.DTO;

public class GetDiscountDTO
{
    public int Id { get; set; }
    public int PercentageId { get; set; }
    public decimal PercentageValue { get; set; }
    public int GameId { get; set; }
    public string GameTitle { get; set; } = null!;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }

}
