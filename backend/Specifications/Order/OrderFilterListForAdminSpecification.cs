using System;
using GameCore.Models.Order;
using GameCore.Models.Order.DTO;
using GameCore.Enums;

namespace GameCore.Specifications;

public class OrderFilterListForAdminSpecification : Specification<Order>

{
    public OrderFilterListForAdminSpecification(OrderListForAdminsParamsDTO parameters) : base()
    {
        AddInclude(o => o.Game);
        AddInclude(o => o.PaymentMethod);
        AddInclude(o => o.User);
        if (parameters != null)
        {
            if (parameters.GameId != null)
            {
                AddCriteria(o => o.GameId == parameters.GameId);
            }
            if (parameters.GameTitle != null)
            {
                AddCriteria(o => o.Game.Title.Contains(parameters.GameTitle));
            }
            if (parameters.UserId != null)
            {
                AddCriteria(o => o.UserId == parameters.UserId);
            }
            if (parameters.UserName != null)
            {
                AddCriteria(o => o.User.Username.Contains(parameters.UserName));
            }
            if (parameters.PaymentMethodId != null)
            {
                AddCriteria(o => o.PaymentMethodId == parameters.PaymentMethodId);
            }
            if (parameters.CreatedAfter != null)
            {
                AddCriteria(o => o.CreatedAt > parameters.CreatedAfter);
            }
            if (parameters.CreatedBefore != null)
            {
                AddCriteria(o => o.CreatedAt < parameters.CreatedBefore);
            }
            if (parameters.MinPrice != null)
            {
                AddCriteria(o => o.BasePrice >= parameters.MinPrice);
            }
            if (parameters.MaxPrice != null)
            {
                AddCriteria(o => o.BasePrice <= parameters.MaxPrice);
            }
            if (parameters.DiscountApplied != null)
            {
                AddCriteria(o => o.DiscountApplied == parameters.DiscountApplied);
            }
            //ordenar

            if (!parameters.Ascending)
            {
                switch (parameters.OrderBy)
                {
                    case SORT_BY.CREATED_AT:
                        AddOrderByDescending(o => o.CreatedAt);
                        break;
                    case SORT_BY.PRICE:
                        AddOrderByDescending(o => o.BasePrice);
                        break;
                    default:
                        AddOrderByDescending(o => o.CreatedAt);
                        break;
                }
            }
            else
            {
                switch (parameters.OrderBy)
                {
                    case SORT_BY.CREATED_AT:
                        AddOrderBy(o => o.CreatedAt);
                        break;
                    case SORT_BY.PRICE:
                        AddOrderBy(o => o.BasePrice);
                        break;
                    default:
                        AddOrderBy(o => o.CreatedAt);
                        break;
                }
            }
            //paginacion
            int skip = (parameters.PageNumber - 1) * parameters.PageSize;
            int take = parameters.PageSize;
            AddSkip(skip);
            AddTake(take);
        }
    }

}
