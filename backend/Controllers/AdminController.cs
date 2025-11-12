using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using GameCore.Services;
using GameCore.Models.Game.DTO;
using Microsoft.AspNetCore.Authorization;
using GameCore.Enums;
using GameCore.Utils;
using System.Net;
using GameCore.Models.User.DTO;
using GameCore.Models.Developer.DTO;
using GameCore.Models.Discount.DTO;
using GameCore.Models.Order.DTO;
using GameCore.Models.Achievement.DTO;


namespace GameCore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = $" {ROLE.ADMIN}")]
    public class AdminController : ControllerBase
    {
        private readonly GameServices _gameServices;
        private readonly UserServices _userServices;
        private readonly DeveloperServices _devServices;
        private readonly DiscountServices _discountServices;
        private readonly OrderServices _orderServices;
        private readonly AchievementServices _achievementServices;


        public AdminController(GameServices gameServices, UserServices userServices, DeveloperServices devServices, DiscountServices discountServices, OrderServices orderServices, AchievementServices achievementServices)
        {
            _gameServices = gameServices;
            _userServices = userServices;
            _devServices = devServices;
            _discountServices = discountServices;
            _orderServices = orderServices;
            _achievementServices = achievementServices;
        }
        // GET ALL
        [HttpGet("games")]
        [ProducesResponseType(typeof(List<GetGameDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<List<GetGameDTO>>> GetGames([FromQuery] GameListParametersDTO parameters)
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
        [HttpGet("games/{id}")]
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
        // POST
        [HttpPost("games")]
        [ProducesResponseType(typeof(GetGameDTO), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<GetGameDTO>> CreateGame([FromBody] CreateGameDTO createGameDTO)
        {
            try
            {
                var res = await _gameServices.CreateOneAsync(createGameDTO);
                return Created("CreateGame", res);
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
        // Crear muchos juegos a la vez
        [HttpPost("games/many")]
        [ProducesResponseType(typeof(List<GetGameDTO>), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<List<GetGameDTO>>> CreateManyGames([FromBody] List<CreateGameDTO> createGameDTOs)
        {
            try
            {
                var res = await _gameServices.CreateManyAsync(createGameDTOs);
                return Created("CreateManyGames", res);
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

        // PUT
        [HttpPut("games/{id}")]
        [ProducesResponseType(typeof(GetGameDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<GetGameDTO>> UpdateGame([FromRoute] int id, [FromBody] UpdateGameDTO updateGameDTO)
        {
            try
            {
                var res = await _gameServices.UpdateOneById(id, updateGameDTO);
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
        // DELETE
        [HttpDelete("games/{id}")]
        [ProducesResponseType(typeof(void), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> DeleteGame([FromRoute] int id)
        {
            try
            {
                await _gameServices.DeleteOneById(id);
                return Ok();
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
        // CAMBIAR ROL DE UN USUARIO POR USERNAME
        [HttpPut("users/{username}")]
        [ProducesResponseType(typeof(UserWithoutPassDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<UserWithoutPassDTO>> UpdateUserRole([FromRoute] string username, [FromBody] UpdateUserRoleDTO updateUserRoleDTO)
        {
            try
            {
                var res = await _userServices.UpdateRoleByUsernameAsync(username, updateUserRoleDTO);
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
        //Crear un developer
        [HttpPost("developers")]
        [ProducesResponseType(typeof(GetDeveloperDTO), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<GetDeveloperDTO>> CreateDeveloper([FromBody] CreateDeveloperDTO createDeveloperDTO)
        {
            try
            {
                var res = await _devServices.CreateOneAsync(createDeveloperDTO);
                return Created("CreateDeveloper", res);
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
                    new HttpMessage(ex.Message));
            }
        }
        // creamos un descuento a un juego
        [HttpPost("games/{gameId}/discounts")]
        [ProducesResponseType(typeof(void), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> CreateDiscount([FromBody] CreateDiscountDTO createDiscountDTO, [FromRoute] int gameId)
        {
            try
            {
                await _discountServices.CreateOneAsync(gameId, createDiscountDTO);
                return Created("CreateDiscount", null);
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
        // creamos un achievement a un juego
        [HttpPost("games/{gameId}/achievements")]
        [ProducesResponseType(typeof(void), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> CreateAchievement([FromBody] CreateAchievementDTO createAchievementDTO, [FromRoute] int gameId)
        {
            try
            {
                await _achievementServices.CreateOneAsync(gameId, createAchievementDTO);
                return Created("CreateAchievement", null);
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
        // obetener las ordenes de los usuarios
        [HttpGet("orders")]
        [ProducesResponseType(typeof(OrderListForAdminsPagedResultDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<OrderListForAdminsPagedResultDTO>> GetOrders([FromQuery] OrderListForAdminsParamsDTO parameters)
        {
            try
            {
                var res = await _orderServices.GetOrdersAsync(parameters);
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
        //eliminamos un developer por su id
        [HttpDelete("developers/{id}")]
        [ProducesResponseType(typeof(void), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> DeleteDeveloper([FromRoute] int id)
        {
            try
            {
                await _devServices.DeleteOneByIdAsync(id);
                return Ok();
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
        //actualizar dev
        [HttpPut("developers/{id}")]
        [ProducesResponseType(typeof(GetDeveloperDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<GetDeveloperDTO>> UpdateDeveloper([FromRoute] int id, [FromBody] UpdateDeveloperDTO updateDeveloperDTO)
        {
            try
            {
                var res = await _devServices.UpdateOneByIdAsync(id, updateDeveloperDTO);
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

