using System;

namespace GameCore.Models.User.DTO;


public class UserListPagedResultDTO
{
    public IEnumerable<UserWithoutPassDTO> Users { get; set; } = Enumerable.Empty<UserWithoutPassDTO>();
    public int TotalCount { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public int TotalPages { get; set; }

}
