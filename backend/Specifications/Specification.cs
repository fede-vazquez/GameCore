using System;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
namespace GameCore.Specifications;

using LinqKit;
public interface ISpecification<TEntity> where TEntity : class
{
    Expression<Func<TEntity, bool>>? Criteria { get; }
    List<Expression<Func<TEntity, object>>> Includes { get; }
    List<string> IncludeStrings { get; }
    Expression<Func<TEntity, object>>? OrderBy { get; }
    Expression<Func<TEntity, object>>? OrderByDescending { get; }
    int Skip { get; }
    int Take { get; }
}
public abstract class Specification<TEntity> : ISpecification<TEntity>
where TEntity : class
{
    public Specification()
    {
        Criteria = PredicateBuilder.New<TEntity>(true);
    }

    public Expression<Func<TEntity, bool>>? Criteria { get; private set; }

    public List<Expression<Func<TEntity, object>>> Includes { get; } = new();

    public Expression<Func<TEntity, object>>? OrderBy { get; private set; }
    public Expression<Func<TEntity, object>>? OrderByDescending { get; private set; }
    public List<string> IncludeStrings { get; private set; } = new List<string>();
    public int Skip { get; private set; }
    public int Take { get; private set; }
    protected void AddCriteria(Expression<Func<TEntity, bool>> criteria)
    {

        Criteria = PredicateBuilder.And(Criteria, criteria);
    }
    protected void AddInclude(string includeString)
    {
        IncludeStrings.Add(includeString);
    }
    protected void AddInclude(Expression<Func<TEntity, object>> include)
    {
        Includes.Add(include);
    }
    protected void AddOrderBy(Expression<Func<TEntity, object>> orderBy)
    {
        OrderBy = orderBy;
    }
    protected void AddOrderByDescending(Expression<Func<TEntity, object>> orderByDescending)
    {
        OrderByDescending = orderByDescending;
    }
    protected void AddSkip(int skip)
    {
        Skip = skip;
    }
    protected void AddTake(int take)
    {
        Take = take;
    }
}
