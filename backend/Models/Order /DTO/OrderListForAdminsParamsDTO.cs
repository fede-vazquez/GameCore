using System;
using GameCore.Enums;

namespace GameCore.Models.Order.DTO;

public class OrderListForAdminsParamsDTO
{
    public int? GameId { get; set; }
    public string? GameTitle { get; set; } = string.Empty;
    public int? UserId { get; set; }
    public string? UserName { get; set; } = string.Empty;
    public int? PaymentMethodId { get; set; }
    public decimal? MinPrice { get; set; }
    public decimal? MaxPrice { get; set; }
    public DateTime? CreatedAfter { get; set; }
    public DateTime? CreatedBefore { get; set; }
    public decimal? DiscountApplied { get; set; }

    public DateTime? CreatedAt { get; set; }
    public string OrderBy { get; set; } = SORT_BY.CREATED_AT;
    public bool Ascending { get; set; } = true;

    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;

}
