using System;

namespace GameCore.Models.Order.DTO;

public class GetOrderDTO
{
    public int Id { get; set; }
    public int GameId { get; set; }
    public int UserId { get; set; }
    public int PaymentMethodId { get; set; }
    public decimal BasePrice { get; set; } = 0;
    public decimal DiscountApplied { get; set; } = 0;

    public DateTime CreatedAt { get; set; }

}
