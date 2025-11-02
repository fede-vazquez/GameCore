using System;

namespace GameCore.Models.User.DTO;

using System.ComponentModel.DataAnnotations;
public class LoginDTO
{
    [Required]
    [MinLength(3)]
    [MaxLength(16)]
    public string Username { get; set; } = null!;

    [Required]
    [MinLength(5)]
    [MaxLength(32)]
    public string Password { get; set; } = null!;
}
