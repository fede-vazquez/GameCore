using System;
using GameCore.Models.Game;
using GameCore.Models.Game.DTO;
using GameCore.Models.GameUser;

namespace GameCore.Specifications;

public interface IGameSpecificationFactory
{
    ISpecification<Game> CreateGameFilterSpecification(GameListParametersDTO parameters);
    ISpecification<GameUser> CreateLibraryFilterSpecification(LibraryListParametersDTO parameters, int userId);
}
public class GameSpecificationFactory : IGameSpecificationFactory
{
    public ISpecification<Game> CreateGameFilterSpecification(GameListParametersDTO parameters)
    {
        return new GameFilterSpecification(parameters);
    }
    public ISpecification<GameUser> CreateLibraryFilterSpecification(LibraryListParametersDTO parameters, int userId)
    {
        return new LibraryFilterListSpecification(parameters, userId);
    }
}
