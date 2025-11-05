using System;

namespace GameCore.Services;

using GameCore.Repositories;
using GameCore.Models.Discount.DTO;
using GameCore.Models.Discount;
using AutoMapper;

public class DiscountServices
{
    private readonly IDiscountRepository _repo;
    private readonly IMapper _mapper;
    public DiscountServices(IDiscountRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }
    public async Task CreateOneAsync(int gameId, CreateDiscountDTO createDTO)
    {
        var discount = _mapper.Map<Discount>(createDTO);
        discount.GameId = gameId;
        await _repo.CreateOneAsync(discount);
    }

}
