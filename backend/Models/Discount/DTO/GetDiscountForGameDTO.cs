using System;

namespace GameCore.Models.Discount.DTO;

public class GetDiscountForGameDTO
{
    public int Id { get; set; }
    public decimal PercentageValue { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }


}
