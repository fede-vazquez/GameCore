using System;

namespace GameCore.Models.Achievement.DTO;

public class CreateAchievementDTO
{
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
}
