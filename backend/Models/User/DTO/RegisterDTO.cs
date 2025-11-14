using System;

namespace GameCore.Models.User.DTO;

using System.ComponentModel.DataAnnotations;

public class RegisterDTO
{
    [Required]
    [MinLength(3)]
    [MaxLength(16)]
    public string Username { get; set; } = null!;

    [Required]
    [EmailAddress]
    [MaxLength(64)]
    public string Email { get; set; } = null!;

    [Required]
    [MinLength(5)]
    [MaxLength(32)]
    public string Password { get; set; } = null!;

    [Required]
    [MinLength(5)]
    [MaxLength(32)]
    public string ConfirmPassword { get; set; } = null!;

}
