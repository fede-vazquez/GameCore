using System;

namespace GameCore.Models.Order.DTO;

public class GetOrderForAdminDTO
{

    public int Id { get; set; }
    public int GameId { get; set; }
    public string GameTitle { get; set; } = string.Empty;
    public int UserId { get; set; }
    public string UserName { get; set; } = string.Empty;
    public int PaymentMethodId { get; set; }
    public string PaymentMethodName { get; set; } = string.Empty;
    public decimal BasePrice { get; set; } = 0;
    public decimal DiscountApplied { get; set; } = 0;
    public DateTime CreatedAt { get; set; }
}
