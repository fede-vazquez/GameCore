using GameCore.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using GameCore.Models.GameUser.DTO;
using GameCore.Utils;
using System.Net;
using Microsoft.AspNetCore.Authorization;
using GameCore.Enums;
namespace GameCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = $"{ROLE.USER}, {ROLE.ADMIN}")]
    public class LibraryController : ControllerBase
    {
        private readonly GameUserServices _gameUserServices;
        private readonly GameServices _gameServices;
        public LibraryController(GameUserServices gameUserServices, GameServices gameServices)
        {
            _gameUserServices = gameUserServices;
            _gameServices = gameServices;
        }
        [HttpGet("")]
        [ProducesResponseType(typeof(List<GetGameUserDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<List<GetGameUserDTO>>> GetLibrary()
        {
            try
            {
                var userIdClaim = User.FindFirst("id");

                if (userIdClaim == null)
                {
                    return Unauthorized("User ID claim no encontrado en eltoken.");
                }

                if (!int.TryParse(userIdClaim.Value, out int userId))
                {
                    return Unauthorized("Formato User ID invalido en el token.");
                }
                var res = await _gameServices.GetGamesByUserIdAsync(userId);
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
        //obtenemos la cantidad de juegos que tiene un usuario
        [HttpGet("count")]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<int>> GetLibraryCount()
        {
            try
            {
                var userIdClaim = User.FindFirst("id");

                if (userIdClaim == null)
                {
                    return Unauthorized("User ID claim no encontrado en eltoken.");
                }

                if (!int.TryParse(userIdClaim.Value, out int userId))
                {
                    return Unauthorized("Formato User ID invalido en el token.");
                }
                var res = await _gameUserServices.GetGameUsersCountByUserIdAsync(userId);
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
