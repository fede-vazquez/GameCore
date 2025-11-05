using System;

namespace GameCore.Services;

using GameCore.Repositories;
using GameCore.Models.Percentage.DTO;
using GameCore.Utils;
using AutoMapper;
using System.Net;

public class PercentageService
{
    private readonly IPercentageRepository _repo;
    private readonly IMapper _mapper;
    public PercentageService(IPercentageRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }
    public async Task<List<GetPercentageDTO>> GetAllAsync()
    {
        var percentages = await _repo.GetAllAsync();
        return _mapper.Map<List<GetPercentageDTO>>(percentages);
    }

}
