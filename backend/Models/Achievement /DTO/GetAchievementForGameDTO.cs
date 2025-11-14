using System;

namespace GameCore.Models.Achievement.DTO;

public class GetAchievementForGameDTO
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
}
