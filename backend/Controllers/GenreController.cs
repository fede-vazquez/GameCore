using GameCore.Models.Genre;
using GameCore.Models.Genre.DTO;
using GameCore.Services;
using GameCore.Utils;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using GameCore.Enums;
using Microsoft.AspNetCore.Authorization;

namespace GameCore.Controllers
{
    [Route("api/genre")]
    [ApiController]
    public class GenreController : ControllerBase
    {
        private readonly GenreServices _genreServices;

        public GenreController(AuthServices authServices, GenreServices genreServices)
        {
            _genreServices = genreServices;
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<Genre>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        async public Task<ActionResult<List<Genre>>> GetAll()
        {
            try
            {
                var genres = await _genreServices.GetAll();
                return Ok(genres);
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

        [HttpPost]
        [Authorize(Roles = ROLE.ADMIN)]
        [ProducesResponseType(typeof(CreateGenreResponseDTO), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status403Forbidden)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        async public Task<ActionResult<Genre>> CreateOne(CreateGenreDTO genreDTO)
        {
            try
            {
                var genre = await _genreServices.CreateOne(genreDTO);

                return Created("created", genre);
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
