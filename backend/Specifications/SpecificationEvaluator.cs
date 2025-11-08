using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace GameCore.Specifications;


internal static class SpecificationEvaluator
{
    public static IQueryable<TEntity> GetQuery<TEntity>(IQueryable<TEntity> inputQuery, ISpecification<TEntity> spec)
    where TEntity : class
    {
        IQueryable<TEntity> query = inputQuery;
        if (spec.Criteria != null)
        {
            query = query.Where(spec.Criteria);
        }
        query = spec.Includes.Aggregate(query, (current, includes) => current.Include(includes));
        if (spec.OrderBy != null)
        {
            query = query.OrderBy(spec.OrderBy);
        }
        if (spec.OrderByDescending != null)
        {
            query = query.OrderByDescending(spec.OrderByDescending);
        }
        query = query.Skip(spec.Skip);
        query = query.Take(spec.Take);

        return query;
    }
}
