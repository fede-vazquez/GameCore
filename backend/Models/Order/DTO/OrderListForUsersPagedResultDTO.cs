using System;

namespace GameCore.Models.Order.DTO;

public class OrderListForUsersPagedResultDTO
{
    public List<GetOrderForUserDTO> Items { get; set; } = new List<GetOrderForUserDTO>();
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public int TotalCount { get; set; }
    public int TotalPages { get; set; }
}
