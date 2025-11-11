using GameCore.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using GameCore.Models.GameUser.DTO;
using GameCore.Utils;
using System.Net;
using Microsoft.AspNetCore.Authorization;
using GameCore.Enums;
using GameCore.Models.Game.DTO;

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
        [ProducesResponseType(typeof(LibraryListPagedResultDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<LibraryListPagedResultDTO>> GetLibrary([FromQuery] LibraryListParametersDTO parameters)
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
                var res = await _gameUserServices.GetGamesByUserIdAsync(parameters, userId);
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
