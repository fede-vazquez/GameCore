using System;
using GameCore.Models.Discount;
using GameCore.Models.Discount.DTO;
namespace GameCore.Specifications;

public interface ISpecificationDiscountFactory
{
    public ISpecification<Discount> CreateDiscountFilterSpecification(DiscountListParamsDTO parameters);
}
public class SpecificationDiscountFactory : ISpecificationDiscountFactory
{
    public ISpecification<Discount> CreateDiscountFilterSpecification(DiscountListParamsDTO parameters)
    {
        return new DiscountFIlterSpecification(parameters);
    }

}
