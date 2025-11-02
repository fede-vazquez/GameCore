using System;
using GameCore.Models.Rol;

namespace GameCore.Models.User.DTO;

public class UserWithoutPassDTO
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string Email { get; set; } = null!;

    public Rol.Rol Rol { get; set; } = null!;
}
