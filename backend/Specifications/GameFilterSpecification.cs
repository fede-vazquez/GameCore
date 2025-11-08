using System;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using GameCore.Models.Game;
using GameCore.Models.Game.DTO;
using GameCore.Enums;
using System.Net;
using GameCore.Utils;

namespace GameCore.Specifications;

public class GameFilterSpecification : Specification<Game>
{
    public GameFilterSpecification(GameListParametersDTO? gameListParametersDTO, int? userId) : base()
    {
        AddInclude(g => g.Genres);
        if (userId != null)
        {
            AddInclude(g => g.GameUsers.Where(gu => gu.UserId == userId));
            AddCriteria(g => g.GameUsers.Any(gu => gu.UserId == userId));
        }
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
                AddCriteria(g => g.Discounts.OrderByDescending(d => d.Id).FirstOrDefault() != null && g.Discounts.OrderByDescending(d => d.Id).FirstOrDefault().PercentageId == gameListParametersDTO.PercentageId && g.Discounts.OrderByDescending(d => d.Id).FirstOrDefault().EndDate > DateTime.Now && g.Discounts.OrderByDescending(d => d.Id).FirstOrDefault().StartDate < DateTime.Now);
            }
            if (gameListParametersDTO.Year != null)
            {
                AddCriteria(g => g.ReleaseDate.Year == gameListParametersDTO.Year);
            }
            //ordenar
            switch (gameListParametersDTO.SortBy)
            {
                case SORT_BY.TITLE:
                    AddOrderBy(g => g.Title);
                    break;

                case SORT_BY.RELEASE_DATE:
                    AddOrderBy(g => g.ReleaseDate);
                    break;
                default:
                    AddOrderBy(g => g.Title);
                    break;
            }

            if (!gameListParametersDTO.Ascending)
            {
                AddOrderByDescending(g => g.Title);
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
