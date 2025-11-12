using Microsoft.EntityFrameworkCore;
using GameCore.Models.Game;
using GameCore.Models.Game.DTO;
using GameCore.Enums;
using System.Net;
using GameCore.Utils;
using GameCore.Models.Discount.DTO;

namespace GameCore.Specifications;

public class GameFilterSpecification : Specification<Game>
{
    public GameFilterSpecification(GameListParametersDTO? gameListParametersDTO) : base()
    {
        AddInclude(g => g.Genres);
        AddInclude(g => g.Discounts);
        AddInclude(g => g.Developer);
        AddInclude("Discounts.Percentage");
        AddInclude(g => g.Achievements);
        if (gameListParametersDTO != null)
        {
            if (gameListParametersDTO.Name != null)
            {
                AddCriteria(g => g.Title.Contains(gameListParametersDTO.Name));
            }
            if (gameListParametersDTO.GenreId != null)
            {
                AddCriteria(g => g.Genres.Any(gg => gg.Id == gameListParametersDTO.GenreId));
            }
            if (gameListParametersDTO.DeveloperId != null)
            {
                AddCriteria(g => g.DeveloperId == gameListParametersDTO.DeveloperId);
            }
            //filtrar por el ultimo descuento
            if (gameListParametersDTO.PercentageId != null)
            {
                int desiredPercentageId = gameListParametersDTO.PercentageId.Value;
                DateTime now = DateTime.Now;

                AddCriteria(g => g.Discounts
                    .Where(d =>
                        d.PercentageId == desiredPercentageId &&
                        d.StartDate < now &&
                        d.EndDate > now
                    )
                    .Any()
                );
            }
            if (gameListParametersDTO.Year != null)
            {
                AddCriteria(g => g.ReleaseDate.Year == gameListParametersDTO.Year);
            }
            if (gameListParametersDTO.MinPrice != null)
            {
                AddCriteria(g => g.Price >= gameListParametersDTO.MinPrice);
            }
            if (gameListParametersDTO.MaxPrice != null)
            {
                AddCriteria(g => g.Price <= gameListParametersDTO.MaxPrice);
            }
            if (gameListParametersDTO.MinMetacriticScore != null)
            {
                AddCriteria(g => g.MetacriticScore >= gameListParametersDTO.MinMetacriticScore);
            }
            //ordenar
            if (!gameListParametersDTO.Ascending)
            {
                switch (gameListParametersDTO.SortBy)
                {
                    case SORT_BY.TITLE:
                        AddOrderByDescending(g => g.Title);
                        break;
                    case SORT_BY.RELEASE_DATE:
                        AddOrderByDescending(g => g.ReleaseDate);
                        break;
                    case SORT_BY.DISCOUNT_PERCENTAGE:
                        AddOrderByDescending(g => g.Discounts.Where(d => d.StartDate <= DateTime.Now && d.EndDate >= DateTime.Now).Max(d => d.Percentage.Value));
                        break;
                    default:
                        AddOrderByDescending(g => g.Title);
                        break;
                }
            }
            else
            {
                switch (gameListParametersDTO.SortBy)
                {
                    case SORT_BY.TITLE:
                        AddOrderBy(g => g.Title);
                        break;

                    case SORT_BY.RELEASE_DATE:
                        AddOrderBy(g => g.ReleaseDate);
                        break;
                    case SORT_BY.DISCOUNT_PERCENTAGE:
                        AddOrderBy(g => g.Discounts.Where(d => d.StartDate <= DateTime.Now && d.EndDate >= DateTime.Now).Max(d => d.Percentage.Value));
                        break;
                    default:
                        AddOrderBy(g => g.Title);
                        break;
                }
            }
            //paginacion
            int skip = (gameListParametersDTO.PageNumber - 1) * gameListParametersDTO.PageSize;
            int take = gameListParametersDTO.PageSize;
            AddSkip(skip);
            AddTake(take);
        }
        else
        {
            throw new HttpResponseError(HttpStatusCode.BadRequest, "Parametros invalidos");
        }
    }
}
