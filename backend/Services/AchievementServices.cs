using System;
using GameCore.Repositories;
using GameCore.Models.Achievement.DTO;
using GameCore.Models.Achievement;
using AutoMapper;
using GameCore.Utils;
using System.Net;
namespace GameCore.Services;

public class AchievementServices
{
    private readonly IAchievementRepository _repo;
    private readonly IMapper _mapper;

    public AchievementServices(IAchievementRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }
    //create one by gameId
    public async Task<GetAchievementForGameDTO> CreateOneAsync(int gameId, CreateAchievementDTO createDTO)
    {
        if (await _repo.GetOneAsync(x => x.Name == createDTO.Name) != null)
        {
            throw new HttpResponseError(HttpStatusCode.BadRequest, "Ya existe un achievement con ese nombre");
        }
        var achievement = _mapper.Map<Achievement>(createDTO);
        achievement.GameId = gameId;
        await _repo.CreateOneAsync(achievement);
        return _mapper.Map<GetAchievementForGameDTO>(achievement);
    }
}
