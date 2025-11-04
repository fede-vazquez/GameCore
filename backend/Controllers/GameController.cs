using Microsoft.AspNetCore.Mvc;
using GameCore.Models.Game.DTO;
using GameCore.Utils;
using System.Net;
using GameCore.Services;
using GameCore.Models.Order.DTO;
using Microsoft.AspNetCore.Authorization;
using GameCore.Enums;
using System.Security.Claims;



namespace GameCore.Controllers;

[ApiController]

[Route("api/[controller]")]
public class GamesController : ControllerBase
{

    private readonly GameServices _gameServices;
    private readonly OrderServices _orderServices;
    private readonly GameUserServices _gameUserServices;

    public GamesController(GameServices gameServices, OrderServices orderServices, GameUserServices gameUserServices)
    {
        _gameServices = gameServices;
        _orderServices = orderServices;
        _gameUserServices = gameUserServices;
    }
    // GET ALL
    [HttpGet("/")]
    [ProducesResponseType(typeof(List<GetGameDTO>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<List<GetGameDTO>>>

    GetGames([FromQuery] GameListParametersDTO parameters)
    {
        try
        {
            var res = await _gameServices.GetAllAsync(parameters);
            return Ok(res);
        }
        catch (HttpResponseError ex)
        {
            return StatusCode(
                (int)ex.StatusCode,
                new HttpMessage(ex.Message)
            );
        }
        catch (Exception ex)
        {
            return StatusCode(
                (int)HttpStatusCode.InternalServerError,
                new HttpMessage(ex.Message)
            );
        }
    }
    // GET BY ID
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(GetGameDTO), StatusCodes.Status200OK)]
    public async Task<ActionResult<GetGameDTO>> GetGameById([FromRoute] int id)
    {
        try
        {
            var res = await _gameServices.GetOneByIdAsync(id);
            return Ok(res);

        }
        catch (HttpResponseError ex)
        {
            return StatusCode(
                (int)ex.StatusCode,
                new HttpMessage(ex.Message)
            );
        }
        catch (Exception ex)
        {
            return StatusCode(
                (int)HttpStatusCode.InternalServerError,
                new HttpMessage(ex.Message)
            );
        }

    }
    // Compramos un juego
    [HttpPut("{gameId}/buy")]
    [Authorize(Roles = $"{ROLE.USER}, {ROLE.ADMIN}")]
    [ProducesResponseType(typeof(GetOrderDTO), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<GetOrderDTO>> BuyGame([FromRoute] int gameId, [FromBody] CreateOrderDTO orderDTO)
    {
        try
        {
            var userIdClaim = User.FindFirst("id");

            if (userIdClaim == null)
            {
                return Unauthorized("User ID claim no encontrado en el token.");
            }
            int userId;

            if (!int.TryParse(userIdClaim.Value, out userId))
            {
                return Unauthorized("Formato User ID invalido en el token.");
            }
            var res = await _orderServices.CreateOneAsync(gameId, userId, orderDTO);
            return Ok(res);
        }
        catch (HttpResponseError ex)
        {
            return StatusCode(
                (int)ex.StatusCode,
                new HttpMessage(ex.Message)
            );
        }
        catch (Exception ex)
        {
            return StatusCode(
                (int)HttpStatusCode.InternalServerError,
                new HttpMessage(ex.Message)
            );
        }
    }
    //obtener la catidad de usuario que tiene un juego
    [HttpGet("{gameId}/users")]
    [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
    public async Task<ActionResult<int>> GetGameUsersCountByGameId([FromRoute] int gameId)
    {
        try
        {
            var res = await _gameUserServices.GetGameUsersCountByGameIdAsync(gameId);
            return Ok(res);
        }
        catch (HttpResponseError ex)
        {
            return StatusCode(
                (int)ex.StatusCode,
                new HttpMessage(ex.Message)
            );
        }
        catch (Exception ex)
        {
            return StatusCode(
                (int)HttpStatusCode.InternalServerError,
                new HttpMessage(ex.Message)
            );
        }
    }

}
