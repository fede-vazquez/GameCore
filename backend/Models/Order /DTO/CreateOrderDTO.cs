using System;

namespace GameCore.Models.Order.DTO;

using System.ComponentModel.DataAnnotations;


public class CreateOrderDTO
{
    [Required]
    public int PaymentMethodId { get; set; }
    [Required]
    public decimal DiscountApplied { get; set; } = 0;
}
