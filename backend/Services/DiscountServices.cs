using System;

namespace GameCore.Services;

using GameCore.Repositories;
using GameCore.Models.Discount.DTO;
using GameCore.Models.Discount;
using AutoMapper;
using GameCore.Specifications;
using GameCore.Utils;
using System.Net;
public class DiscountServices
{
    private readonly IDiscountRepository _repo;
    private readonly IMapper _mapper;
    private readonly ISpecificationDiscountFactory _discountSpecificationFactory;
    public DiscountServices(IDiscountRepository repo, IMapper mapper, ISpecificationDiscountFactory discountSpecificationFactory)
    {
        _repo = repo;
        _mapper = mapper;
        _discountSpecificationFactory = discountSpecificationFactory;
    }
    public async Task CreateOneAsync(int gameId, CreateDiscountDTO createDTO)
    {
        var discount = _mapper.Map<Discount>(createDTO);
        discount.GameId = gameId;
        await _repo.CreateOneAsync(discount);
    }
    public async Task<DiscountLIstPagedResultDTO> GetAllAsync(DiscountListParamsDTO discountListParams)
    {
        var spec = _discountSpecificationFactory.CreateDiscountFilterSpecification(discountListParams);
        var discounts = await _repo.GetAllOrdersAsync(spec);
        var discountsDTO = _mapper.Map<List<GetDiscountDTO>>(discounts);
        var result = new DiscountLIstPagedResultDTO();
        var count = await _repo.GetCountAsync(spec);
        result.Discounts = discountsDTO;
        result.TotalCount = count;
        result.TotalPages = (int)Math.Ceiling((double)count / discountListParams.PageSize);
        if (discountListParams != null)
        {
            result.CurrentPage = discountListParams.PageNumber;
            result.PageSize = discountListParams.PageSize;
        }
        return result;
    }
    public async Task<GetDiscountDTO> GetOneById(int id)
    {
        var discount = await _repo.GetOneAsync(d => d.Id == id);
        if (discount == null)
        {
            throw new HttpResponseError(HttpStatusCode.NotFound, "Descuento no encontrado");
        }
        else
        {
            return _mapper.Map<GetDiscountDTO>(discount);
        }
    }
    public async Task DeleteOneById(int id)
    {
        var discount = await _repo.GetOneAsync(d => d.Id == id);
        if (discount == null)
        {
            throw new HttpResponseError(HttpStatusCode.NotFound, "Descuento no encontrado");
        }
        else
        {
            await _repo.DeleteOneAsync(discount);
        }
    }
}
