using System;
using GameCore.Enums;
namespace GameCore.Models.Discount.DTO;

public class DiscountListParamsDTO
{
    public int? GameId { get; set; }
    public string? GameTitle { get; set; } = null!;
    public DateTime? StartAfter { get; set; }
    public DateTime? EndBefore { get; set; }
    public int? PercentageId { get; set; }
    public string? OrderBy { get; set; } = SORT_BY.CREATED_AT;
    public bool Ascending { get; set; } = true;
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 5;
}
