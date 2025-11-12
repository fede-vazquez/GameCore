using GameCore.Services;
using GameCore.Models.User;
using GameCore.Models.User.DTO;
using Microsoft.AspNetCore.Mvc;
using GameCore.Utils;
using System.Net;
using Microsoft.AspNetCore.Authorization;
using GameCore.Enums;
using GameCore.Models.Order.DTO;
using GameCore.Models.Order;
namespace GameCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = $"{ROLE.USER}, {ROLE.ADMIN}")]
    public class ProfileController : ControllerBase
    {
        private readonly UserServices _userServices;
        private readonly OrderServices _orderServices;


        public ProfileController(UserServices userServices, OrderServices orderServices)
        {
            _userServices = userServices;
            _orderServices = orderServices;
        }
        [HttpGet("")]
        [ProducesResponseType(typeof(UserWithoutPassDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<UserWithoutPassDTO>> GetProfile()
        {
            try
            {
                var userIdClaim = User.FindFirst("id");

                if (userIdClaim == null)
                {
                    return Unauthorized("User ID claim no encontrado en eltoken.");
                }
                int userId;

                if (!int.TryParse(userIdClaim.Value, out userId))
                {
                    return Unauthorized("Formato User ID invalido en el token.");
                }
                var res = await _userServices.GetOneByIdAsync(userId);
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
        // ver el historial de ordenes de un usuario
        [HttpGet("orders")]
        [ProducesResponseType(typeof(OrderListForUsersPagedResultDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<OrderListForUsersPagedResultDTO>> GetOrders([FromQuery] OrderListForUsersParamsDTO parameters)
        {
            try
            {
                var userIdClaim = User.FindFirst("id");

                if (userIdClaim == null)
                {
                    return Unauthorized("User ID claim no encontrado en eltoken.");
                }
                int userId;

                if (!int.TryParse(userIdClaim.Value, out userId))
                {
                    return Unauthorized("Formato User ID invalido en el token.");
                }
                var res = await _orderServices.GetOrdersByUserIdAsync(parameters, userId);
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
        //actualizar usuario
        [HttpPut("")]
        [ProducesResponseType(typeof(UserWithoutPassDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<UserWithoutPassDTO>> UpdateProfile([FromBody] UpdateUserDTO updateUserDTO)
        {
            try
            {
                var userIdClaim = User.FindFirst("id");

                if (userIdClaim == null)
                {
                    return Unauthorized("User ID claim no encontrado en eltoken.");
                }
                int userId;

                if (!int.TryParse(userIdClaim.Value, out userId))
                {
                    return Unauthorized("Formato User ID invalido en el token.");
                }
                var res = await _userServices.UpdateOneByIdAsync(userId, updateUserDTO);
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
}
