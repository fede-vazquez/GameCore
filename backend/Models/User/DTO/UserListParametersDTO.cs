using System;

namespace GameCore.Models.User.DTO;

public class UserListParametersDTO
{
    public string? Username { get; set; }
    public string? Email { get; set; }
    public bool? IsActive { get; set; }
    public int? RolId { get; set; }
    public DateTime? CreatedAfter { get; set; }

    public string? SortBy { get; set; }
    public bool Ascending { get; set; } = true;

    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;

}
