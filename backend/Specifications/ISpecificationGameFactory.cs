using System;
using GameCore.Models.Game;
using GameCore.Models.Game.DTO;
using GameCore.Specifications;

namespace GameCore.Specifications;

public interface IGameSpecificationFactory
{
    ISpecification<Game> CreateGameFilterSpecification(GameListParametersDTO parameters, int? userId);
}
public class GameSpecificationFactory : IGameSpecificationFactory
{
    public ISpecification<Game> CreateGameFilterSpecification(GameListParametersDTO parameters, int? userId)
    {
        return new GameFilterSpecification(parameters, userId);
    }
}
