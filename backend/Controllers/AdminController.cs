using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using GameCore.Services;
using GameCore.Models.Game.DTO;
using Microsoft.AspNetCore.Authorization;
using GameCore.Enums;
using GameCore.Utils;
using System.Net;
using GameCore.Models.User;
using GameCore.Models.User.DTO;
using GameCore.Models.Developer;
using GameCore.Models.Developer.DTO;


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
        public AdminController(GameServices gameServices, UserServices userServices, DeveloperServices devServices)
        {
            _gameServices = gameServices;
            _userServices = userServices;
            _devServices = devServices;
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
    }
}

