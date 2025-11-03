using Microsoft.AspNetCore.Mvc;
using GameCore.Models.Game.DTO;
using GameCore.Utils;
using System.Net;
using Microsoft.AspNetCore.Http;
using GameCore.Services;


namespace GameCore.Controllers;

[ApiController]

[Route("api/[controller]")]
public class GameController : ControllerBase
{

    private readonly GameServices _gameServices;
    public GameController(GameServices gameServices)
    {
        _gameServices = gameServices;
    }
    // GET ALL
    [HttpGet("games")]
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

}
