using System;
using GameCore.Models.Discount;
using GameCore.Models.Discount.DTO;
using GameCore.Enums;

namespace GameCore.Specifications;

public class DiscountFIlterSpecification : Specification<Discount>
{
    public DiscountFIlterSpecification(DiscountListParamsDTO discountListParams) : base()
    {
        AddInclude(d => d.Game);
        AddInclude(d => d.Percentage);
        if (discountListParams != null)
        {
            if (discountListParams.GameId != null)
            {
                AddCriteria(d => d.GameId == discountListParams.GameId);
            }
            if (discountListParams.GameTitle != null)
            {
                AddCriteria(d => d.Game.Title.Contains(discountListParams.GameTitle));
            }
            if (discountListParams.StartAfter != null)
            {
                AddCriteria(d => d.StartDate > discountListParams.StartAfter);
            }
            if (discountListParams.EndBefore != null)
            {
                AddCriteria(d => d.EndDate < discountListParams.EndBefore);
            }
            if (discountListParams.PercentageId != null)
            {
                AddCriteria(d => d.PercentageId == discountListParams.PercentageId);
            }
            //ordenar

            if (!discountListParams.Ascending)
            {
                switch (discountListParams.OrderBy)
                {
                    case SORT_BY.START_DATE:
                        AddOrderByDescending(d => d.StartDate);
                        break;
                    case SORT_BY.END_DATE:
                        AddOrderByDescending(d => d.EndDate);
                        break;
                    default:
                        AddOrderByDescending(d => d.StartDate);
                        break;
                }
            }
            else
            {
                switch (discountListParams.OrderBy)
                {
                    case SORT_BY.START_DATE:
                        AddOrderBy(d => d.StartDate);
                        break;
                    case SORT_BY.END_DATE:
                        AddOrderBy(d => d.EndDate);
                        break;
                    default:
                        AddOrderBy(d => d.StartDate);
                        break;
                }
            }
            //paginacion
            int skip = (discountListParams.PageNumber - 1) * discountListParams.PageSize;
            AddSkip(skip);
            AddTake(discountListParams.PageSize);
        }
    }
}
