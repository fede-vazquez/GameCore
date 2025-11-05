using System;

namespace GameCore.Models.Discount.DTO;

public class CreateDiscountDTO
{
    public int PercentageId { get; set; }
    public DateTime StartDate { get; set; } = DateTime.UtcNow;
    public DateTime EndDate { get; set; }

}
