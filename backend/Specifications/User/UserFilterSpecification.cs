using System;
using GameCore.Models.User;
using GameCore.Models.User.DTO;
using GameCore.Enums;

using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
namespace GameCore.Specifications;

public class UserFilterSpecification : Specification<User>
{
    public UserFilterSpecification(UserListParametersDTO parameters) : base()
    {
        AddInclude(x => x.Rol);
        if (parameters != null)
        {
            if (parameters.Username != null)
            {
                AddCriteria(x => x.Username.Contains(parameters.Username));
            }
            if (parameters.Email != null)
            {
                AddCriteria(x => x.Email.Contains(parameters.Email));
            }
            if (parameters.RolId != null)
            {
                AddCriteria(x => x.RolId == parameters.RolId);
            }
            if (parameters.IsActive != null)
            {
                AddCriteria(x => x.IsActive == parameters.IsActive);
            }
            if (parameters.CreatedAfter != null)
            {
                AddCriteria(x => x.CreatedAt > parameters.CreatedAfter);
            }
            //ordenar

            if (!parameters.Ascending)
            {
                switch (parameters.SortBy)
                {
                    case SORT_BY.USERNAME:
                        AddOrderByDescending(x => x.Username);
                        break;
                    case SORT_BY.EMAIL:
                        AddOrderByDescending(x => x.Email);
                        break;
                    case SORT_BY.CREATED_AT:
                        AddOrderByDescending(x => x.CreatedAt);
                        break;
                    default:
                        AddOrderByDescending(x => x.Username);
                        break;
                }
            }
            else
            {
                switch (parameters.SortBy)
                {
                    case SORT_BY.USERNAME:
                        AddOrderBy(x => x.Username);
                        break;
                    case SORT_BY.EMAIL:
                        AddOrderBy(x => x.Email);
                        break;
                    case SORT_BY.CREATED_AT:
                        AddOrderBy(x => x.CreatedAt);
                        break;
                    default:
                        AddOrderBy(x => x.Username);
                        break;
                }
            }

        }
        //paginar
        int skip = (parameters.PageNumber - 1) * parameters.PageSize;
        int take = parameters.PageSize;
        AddSkip(skip);
        AddTake(take);
    }


}
