using System;

namespace GameCore.Models.Discount.DTO;

public class DiscountLIstPagedResultDTO
{
    public int CurrentPage { get; set; }
    public int TotalPages { get; set; }
    public int TotalCount { get; set; }
    public int PageSize { get; set; }
    public List<GetDiscountDTO> Discounts { get; set; } = new List<GetDiscountDTO>();
}
