using System;
using GameCore.Models.User;
using GameCore.Models.User.DTO;
using GameCore.Specifications;

namespace GameCore.Specifications;

public interface ISpecificationUserFactory
{
    public ISpecification<User> CreateUserFilterSpecification(UserListParametersDTO parameters);


}
public class UserSpecificationFactory : ISpecificationUserFactory
{
    public ISpecification<User> CreateUserFilterSpecification(UserListParametersDTO parameters)
    {
        return new UserFilterSpecification(parameters);
    }
}
