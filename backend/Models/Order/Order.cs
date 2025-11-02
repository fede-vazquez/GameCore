using System;

namespace GameCore.Models.Order;

using GameCore.Models.User;
using GameCore.Models.PaymentMethod;
using GameCore.Models.Game;
public class Order
{
    public int Id { get; set; }
    public int GameId { get; set; }
    public Game Game { get; set; } = null!;
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    public int PaymentMethodId { get; set; }
    public PaymentMethod PaymentMethod { get; set; } = null!;
    public decimal BasePrice { get; set; } = 0;
    public decimal DiscountApplied { get; set; } = 0;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
