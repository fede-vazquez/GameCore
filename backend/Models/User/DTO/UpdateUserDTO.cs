using System;
using System.ComponentModel.DataAnnotations;
namespace GameCore.Models.User.DTO;

public class UpdateUserDTO
{
    [MinLength(3)]
    [MaxLength(16)]
    public string? Username { get; set; } = null!;

    [EmailAddress]
    [MaxLength(64)]
    public string? Email { get; set; } = null!;

    [MinLength(5)]
    [MaxLength(32)]
    public string? Password { get; set; } = null!;

    [MinLength(5)]
    [MaxLength(32)]
    public string? ConfirmPassword { get; set; } = null!;

}
