using Microsoft.AspNetCore.Mvc;
using GameCore.Models.Game.DTO;
using GameCore.Utils;
using System.Net;
using GameCore.Services;
using GameCore.Models.Order.DTO;
using Microsoft.AspNetCore.Authorization;
using GameCore.Enums;
using GameCore.Models.Genre.DTO;
using GameCore.Models.Discount.DTO;
using GameCore.Models.Percentage.DTO;
using GameCore.Models.PaymentMethod.DTO;
using GameCore.Models.Developer.DTO;


using System.Security.Claims;



namespace GameCore.Controllers;

[ApiController]

[Route("api/[controller]")]
public class GamesController : ControllerBase
{

    private readonly GameServices _gameServices;
    private readonly OrderServices _orderServices;
    private readonly GameUserServices _gameUserServices;
    private readonly GenreServices _genreServices;
    private readonly DiscountServices _discountServices;
    private readonly PercentageService _percentageServices;
    private readonly PaymentMethodService _paymentMethodService;

    private readonly DeveloperServices _devServices;

    public GamesController(GameServices gameServices, OrderServices orderServices, GameUserServices gameUserServices, GenreServices genreServices, DiscountServices discountServices, PercentageService percentageServices, PaymentMethodService paymentMethodService, DeveloperServices devServices)
    {
        _gameServices = gameServices;
        _orderServices = orderServices;
        _gameUserServices = gameUserServices;
        _genreServices = genreServices;
        _discountServices = discountServices;
        _percentageServices = percentageServices;
        _paymentMethodService = paymentMethodService;
        _devServices = devServices;
    }
    // GET ALL
    [HttpGet("")]
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

    //traer la lista de generos
    [HttpGet("genres")]
    [ProducesResponseType(typeof(List<GenreDTO>), StatusCodes.Status200OK)]
    public async Task<ActionResult<List<GenreDTO>>> GetGenres()
    {
        try
        {
            var res = await _genreServices.GetAllAsync();
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
    //obtener lista de descuentos
    [HttpGet("discounts")]
    [ProducesResponseType(typeof(DiscountLIstPagedResultDTO), StatusCodes.Status200OK)]
    public async Task<ActionResult<DiscountLIstPagedResultDTO>> GetDiscounts([FromQuery] DiscountListParamsDTO parameters)
    {
        try
        {
            var res = await _discountServices.GetAllAsync(parameters);
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
    //obtener la lista de porcentages de descuentos disponibles
    [HttpGet("discounts/percentage")]
    [ProducesResponseType(typeof(List<GetPercentageDTO>), StatusCodes.Status200OK)]
    public async Task<ActionResult<List<GetPercentageDTO>>> GetDiscountsPercentage()
    {
        try
        {
            var res = await _percentageServices.GetAllAsync();
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
    //traer todos los metodos de pago disponibles
    [HttpGet("payment-methods")]
    [ProducesResponseType(typeof(List<GetPaymentMethod>), StatusCodes.Status200OK)]
    public async Task<ActionResult<List<GetPaymentMethod>>> GetPaymentMethods()
    {
        try
        {
            var res = await _paymentMethodService.GetAllAsync();
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
    //obtener lista de desarrolladores
    [HttpGet("developers")]
    [ProducesResponseType(typeof(List<GetDeveloperDTO>), StatusCodes.Status200OK)]
    public async Task<ActionResult<List<GetDeveloperDTO>>> GetDevelopers()
    {
        try
        {
            var res = await _devServices.GetAllAsync();
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
