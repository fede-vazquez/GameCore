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
        public LibraryController(GameUserServices gameUserServices)
        {
            _gameUserServices = gameUserServices;
        }
        [HttpGet("library/")]
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
                var res = await _gameUserServices.GetGameUsersByUserIdAsync(userId);
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
        [HttpGet("library/count")]
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
