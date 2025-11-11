using System;

namespace GameCore.Services;

using GameCore.Repositories;
using GameCore.Models.Order;
using GameCore.Utils;
using AutoMapper;
using System.Net;
using GameCore.Models.Order.DTO;
using GameCore.Specifications;
public class OrderServices
{
    private readonly IOrderRepository _repo;
    private readonly IMapper _mapper;
    private readonly GameServices _gameServices;
    private readonly PaymentMethodService _paymentMethodService;
    private readonly UserServices _userServices;
    private readonly GameUserServices _gameUserServices;

    private readonly ISpecificationOrderFactory _orderSpecificationFactory;

    public OrderServices(IOrderRepository repo, IMapper mapper, GameServices gameServices, PaymentMethodService paymentMethodService, UserServices userServices, GameUserServices gameUserServices, ISpecificationOrderFactory orderSpecificationFactory)
    {
        _repo = repo;
        _mapper = mapper;
        _gameServices = gameServices;
        _paymentMethodService = paymentMethodService;
        _userServices = userServices;
        _gameUserServices = gameUserServices;
        _orderSpecificationFactory = orderSpecificationFactory;
    }
    async public Task<List<GetOrderDTO>> GetAllAsync()
    {
        var orders = await _repo.GetAllAsync();
        return _mapper.Map<List<GetOrderDTO>>(orders);
    }
    async public Task<GetOrderDTO> GetOneByIdAsync(int id)
    {
        var order = await _repo.GetOneAsync(o => o.Id == id);
        if (order == null)
        {
            throw new HttpResponseError(HttpStatusCode.NotFound, $"No hay Ordenes con id = {id}");
        }
        return _mapper.Map<GetOrderDTO>(order);
    }
    async public Task<OrderListForUsersPagedResultDTO> GetOrdersByUserIdAsync(OrderListForUsersParamsDTO parameters, int userId)
    {
        var spec = _orderSpecificationFactory.CreateOrderFilterSpecification(parameters, userId);
        var orders = await _repo.GetAllAsync(spec);
        var result = new OrderListForUsersPagedResultDTO();
        result.Items = _mapper.Map<List<GetOrderForUserDTO>>(orders);
        var count = await _repo.GetCountAsync(spec);
        result.TotalCount = count;
        result.TotalPages = (int)Math.Ceiling((double)count / parameters.PageSize);
        if (parameters != null)
        {
            result.PageNumber = parameters.PageNumber;
            result.PageSize = parameters.PageSize;
        }
        return result;
    }
    async public Task<OrderListForAdminsPagedResultDTO> GetOrdersAsync(OrderListForAdminsParamsDTO parameters)
    {
        var spec = _orderSpecificationFactory.CreateOrderFilterListForAdminSpecification(parameters);
        var orders = await _repo.GetAllAsync(spec);
        var result = new OrderListForAdminsPagedResultDTO();
        result.Items = _mapper.Map<List<GetOrderForAdminDTO>>(orders);
        var count = await _repo.GetCountAsync(spec);
        result.TotalCount = count;
        result.TotalPages = (int)Math.Ceiling((double)count / parameters.PageSize);
        if (parameters != null)
        {
            result.PageNumber = parameters.PageNumber;
            result.PageSize = parameters.PageSize;
        }
        return result;
    }

    async public Task<GetOrderDTO> CreateOneAsync(int gameId, int userId, CreateOrderDTO createDTO)
    {
        //comprobamos primero que GameId, UserId y PaymentMethodId existan
        await _gameServices.GetOneByIdAsync(gameId);
        await _userServices.GetOneByIdAsync(userId);
        await _paymentMethodService.GetOneByIdAsync(createDTO.PaymentMethodId);
        //verificamos si el usuario tiene el juego comprado
        var gameUser = await _gameUserServices.ExistsAsync(gameId, userId);
        if (gameUser == true)
        {
            throw new HttpResponseError(HttpStatusCode.BadRequest, "El usuario ya tiene el juego comprado");
        }

        var order = _mapper.Map<Order>(createDTO);
        order.GameId = gameId;
        order.UserId = userId;
        await _repo.CreateOneAsync(order);
        //creamos GameUser
        await _gameUserServices.CreateOneAsync(gameId, userId);
        return _mapper.Map<GetOrderDTO>(order);
    }
    //devolver una lista de ordenes por id de usuario
    async public Task<List<GetOrderDTO>> GetOrdersByUserIdAsync(int userId)
    {
        var orders = await _repo.GetAllAsync(o => o.UserId == userId);
        return _mapper.Map<List<GetOrderDTO>>(orders);
    }
    //devolver una lista de ordenes por id de juego
    async public Task<List<GetOrderDTO>> GetOrdersByGameIdAsync(int gameId)
    {
        var orders = await _repo.GetAllAsync(o => o.GameId == gameId);
        return _mapper.Map<List<GetOrderDTO>>(orders);
    }
    //devolver una lista de ordenes por id de metodo de pago
    async public Task<List<GetOrderDTO>> GetOrdersByPaymentMethodIdAsync(int paymentMethodId)
    {
        var orders = await _repo.GetAllAsync(o => o.PaymentMethodId == paymentMethodId);
        return _mapper.Map<List<GetOrderDTO>>(orders);
    }
}