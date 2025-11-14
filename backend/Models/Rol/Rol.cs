using System;

namespace GameCore.Models.Rol;

using GameCore.Models.User;
// using GameCore.Enums;
public class Rol
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public ICollection<User> Users { get; set; } = new List<User>();
}
