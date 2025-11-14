using System;

namespace GameCore.Models.Order.DTO;

public class OrderListForAdminsPagedResultDTO
{
    public List<GetOrderForAdminDTO> Items { get; set; } = new List<GetOrderForAdminDTO>();
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public int TotalCount { get; set; }
    public int TotalPages { get; set; }
}
