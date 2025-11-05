using System;

namespace GameCore.Models.Order.DTO;

using System.ComponentModel.DataAnnotations;


public class CreateOrderDTO
{
    [Required]
    public int PaymentMethodId { get; set; }
    [Required]
    [Range(0, 1000000000.00, ErrorMessage = "El precio no puede ser negativo.")]
    public decimal BasePrice { get; set; } = 0;

    public decimal DiscountApplied { get; set; } = 0;
}
