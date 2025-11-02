using System;

namespace GameCore.Models.User.DTO;

public class UserWithoutPassDTO
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string Email { get; set; } = null!;

}
