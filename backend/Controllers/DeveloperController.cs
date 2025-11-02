using GameCore.Models.Developer;
using GameCore.Models.Developer.DTO;
using GameCore.Services;
using GameCore.Utils;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using GameCore.Enums;
using Microsoft.AspNetCore.Authorization;

namespace GameCore.Controllers
{
    [Route("api/developer")]
    [ApiController]
    public class DeveloperController : ControllerBase
    {
        private readonly DeveloperServices _developerServices;

        public DeveloperController(DeveloperServices developerServices)
        {
            _developerServices = developerServices;
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<Developer>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<List<Developer>>> GetAll()
        {
            try
            {
                var developers = await _developerServices.GetAll();
                return Ok(developers);
            }
            catch (HttpResponseError ex) when (ex.StatusCode == HttpStatusCode.NotFound)
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

        [HttpPost]
        [Authorize(Roles = ROLE.ADMIN)]
        [ProducesResponseType(typeof(CreateDeveloperResponseDTO), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status403Forbidden)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<CreateDeveloperResponseDTO>> CreateOne([FromBody] CreateDeveloperDTO developerDTO)
        {
            try
            {
                var developer = await _developerServices.Create(developerDTO);
                return Created("created", developer);
            }
            catch (HttpResponseError ex) when (ex.StatusCode == HttpStatusCode.Conflict)
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
