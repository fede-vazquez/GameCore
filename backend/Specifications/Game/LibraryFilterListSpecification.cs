using Microsoft.EntityFrameworkCore;
using GameCore.Models.Game.DTO;
using GameCore.Models.GameUser;

using GameCore.Enums;
using System.Net;
using GameCore.Utils;

namespace GameCore.Specifications;

public class LibraryFilterListSpecification : Specification<GameUser>
{
    public LibraryFilterListSpecification(LibraryListParametersDTO? libraryParametersDTO, int userId) : base()
    {
        AddInclude(g => g.Game);
        AddInclude("Game.Genres");
        AddInclude("Game.Developer");
        AddCriteria(g => g.UserId == userId);
        if (libraryParametersDTO != null)
        {
            if (libraryParametersDTO.Name != null)
            {
                AddCriteria(g => g.Game.Title.Contains(libraryParametersDTO.Name));
            }
            if (libraryParametersDTO.GenreId != null)
            {
                AddCriteria(g => g.Game.Genres.Any(gg => gg.Id == libraryParametersDTO.GenreId));
            }
            if (libraryParametersDTO.DeveloperId != null)
            {
                AddCriteria(g => g.Game.DeveloperId == libraryParametersDTO.DeveloperId);
            }
            if (libraryParametersDTO.Year != null)
            {
                AddCriteria(g => g.Game.ReleaseDate.Year == libraryParametersDTO.Year);
            }
            if (libraryParametersDTO.BuyDate != null)
            {
                AddCriteria(g => g.BuyDate == libraryParametersDTO.BuyDate);
            }
            if (libraryParametersDTO.TimePlayed != null)
            {
                AddCriteria(g => g.TimePlayed == libraryParametersDTO.TimePlayed);
            }
            //ordenar
            if (!libraryParametersDTO.Ascending)
            {
                switch (libraryParametersDTO.SortBy)
                {
                    case SORT_BY.TITLE:
                        AddOrderByDescending(g => g.Game.Title);
                        break;
                    case SORT_BY.RELEASE_DATE:
                        AddOrderByDescending(g => g.Game.ReleaseDate.Year);
                        break;
                    default:
                        AddOrderByDescending(g => g.Game.Title);
                        break;
                }
            }
            else
            {
                switch (libraryParametersDTO.SortBy)
                {
                    case SORT_BY.TITLE:
                        AddOrderBy(g => g.Game.Title);
                        break;
                    case SORT_BY.RELEASE_DATE:
                        AddOrderBy(g => g.Game.ReleaseDate.Year);
                        break;
                    default:
                        AddOrderBy(g => g.Game.Title);
                        break;
                }
            }
            int skip = (libraryParametersDTO.PageNumber - 1) * libraryParametersDTO.PageSize;
            AddSkip(skip);
            AddTake(libraryParametersDTO.PageSize);
        }
        else
        {
            throw new HttpResponseError(HttpStatusCode.BadRequest, "Parametros invalidos");
        }
    }
}
