using System;
using GameCore.Repositories;


using GameCore.Models.PaymentMethod;
using GameCore.Utils;
using GameCore.Models.PaymentMethod.DTO;
using AutoMapper;

namespace GameCore.Services;


public class PaymentMethodService
{
    private readonly IPaymentMethodRepository _repo;
    private readonly IMapper _mapper;
    public PaymentMethodService(IPaymentMethodRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }
    public async Task<GetPaymentMethod> GetOneByNameAsync(string name)
    {
        var method = await _repo.GetOneAsync(r => r.Name == name);
        if (method == null)
        {
            throw new HttpResponseError(System.Net.HttpStatusCode.NotFound, "Method no encontrado");
        }
        return _mapper.Map<GetPaymentMethod>(method);
    }
    public async Task<GetPaymentMethod> GetOneByIdAsync(int id)
    {
        var method = await _repo.GetOneAsync(r => r.Id == id);
        if (method == null)
        {
            throw new HttpResponseError(System.Net.HttpStatusCode.NotFound, "PaymentMethod no encontrado");
        }
        return _mapper.Map<GetPaymentMethod>(method);
    }
    public async Task<List<GetPaymentMethod>> GetAllAsync()
    {
        var methods = await _repo.GetAllAsync();
        return _mapper.Map<List<GetPaymentMethod>>(methods);
    }

}
