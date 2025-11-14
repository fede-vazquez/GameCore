using System;

namespace GameCore.Repositories;

using GameCore.Models.PaymentMethod;
using GameCore.Config;
public interface IPaymentMethodRepository : IRepository<PaymentMethod> { }
public class PaymentMethodRepository : Repository<PaymentMethod>, IPaymentMethodRepository
{
    private readonly ApplicationDbContext _db;
    public PaymentMethodRepository(ApplicationDbContext db) : base(db)
    {
        _db = db;
    }

}
