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
    public static IQueryable<TEntity> GetFilteredQuery<TEntity>(IQueryable<TEntity> inputQuery, ISpecification<TEntity> spec)
    where TEntity : class
    {
        IQueryable<TEntity> query = inputQuery;
        if (spec.Criteria != null)
        {
            query = query.Where(spec.Criteria);
        }
        query = spec.Includes.Aggregate(query, (current, includes) => current.Include(includes));
        query = spec.IncludeStrings.Aggregate(query, (current, include) => current.Include(include));
        if (spec.OrderBy != null)
        {
            query = query.OrderBy(spec.OrderBy);
        }
        if (spec.OrderByDescending != null)
        {
            query = query.OrderByDescending(spec.OrderByDescending);
        }


        return query;
    }
    public static IQueryable<TEntity> ApplyPaging<TEntity>(
        IQueryable<TEntity> query,
        ISpecification<TEntity> spec) where TEntity : class
    {
        query = query.Skip(spec.Skip);
        query = query.Take(spec.Take);
        return query;
    }
}
