using System;
using GameCore.Repositories;

namespace GameCore.Services;

using GameCore.Models.PaymentMethod;
using GameCore.Utils;
using System.Net;


public class PaymentMethodService
{
    private readonly IPaymentMethodRepository _repo;
    public PaymentMethodService(IPaymentMethodRepository repo)
    {
        _repo = repo;
    }
    public Task<PaymentMethod> GetOneByNameAsync(string name)
    {
        var method = _repo.GetOneAsync(r => r.Name == name);
        if (method == null)
        {
            throw new HttpResponseError(System.Net.HttpStatusCode.NotFound, "Method no encontrado");
        }
        return method;
    }
    public Task<PaymentMethod> GetOneByIdAsync(int id)
    {
        var method = _repo.GetOneAsync(r => r.Id == id);
        if (method == null)
        {
            throw new HttpResponseError(System.Net.HttpStatusCode.NotFound, "PaymentMethod no encontrado");
        }
        return method;
    }

}
