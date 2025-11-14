using System;
using System.ComponentModel.DataAnnotations;

namespace GameCore.Models.Developer.DTO;

public class CreateDeveloperDTO
{
    [Required]
    public string Name { get; set; } = null!;

}
