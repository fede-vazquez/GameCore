using System;
using GameCore.Models.Order;
using GameCore.Models.Order.DTO;
namespace GameCore.Specifications;

public interface ISpecificationOrderFactory
{
    public ISpecification<Order> CreateOrderFilterSpecification(OrderListForUsersParamsDTO parameters, int userId);
    public ISpecification<Order> CreateOrderFilterListForAdminSpecification(OrderListForAdminsParamsDTO parameters);
}
public class SpecificationOrderFactory : ISpecificationOrderFactory
{
    public ISpecification<Order> CreateOrderFilterSpecification(OrderListForUsersParamsDTO parameters, int userId)
    {
        return new OrderFilterListForUserSpecification(parameters, userId);
    }

    public ISpecification<Order> CreateOrderFilterListForAdminSpecification(OrderListForAdminsParamsDTO parameters)
    {
        return new OrderFilterListForAdminSpecification(parameters);
    }
}
