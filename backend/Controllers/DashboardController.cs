using GameCore.Enums;
using GameCore.Models.Dashboard.DTO;
using GameCore.Models.User;
using GameCore.Models.User.DTO;
using GameCore.Services;
using GameCore.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace GameCore.Controllers
{
    [ApiController]
    [Route("api/admin/dashboard")]
    [Authorize(Roles = $" {ROLE.ADMIN}")]
    public class DashboardController : ControllerBase
    {
        private readonly DashboardService _dashboardService;

        public DashboardController(DashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        [HttpGet("sales/{year}")]
        [ProducesResponseType(typeof(MonthlySalesPerYearDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<MonthlySalesPerYearDTO>> GetMonthlySales(int year)
        {
            try
            {
                var monthlySales = await _dashboardService.GetMonthlySalesPerYearAsync(year);

                return monthlySales;
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

        [HttpGet("genre/{genreName}")]
        [ProducesResponseType(typeof(GenreGeneralInfoResponseDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<GenreGeneralInfoResponseDTO>> GetGeneralInfoPerGenre(string genreName)
        {
            try
            {
                var genreGeneralInfo = await _dashboardService.GetGenreGeneralInfoAsync(genreName);

                return genreGeneralInfo;
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

        [HttpGet("generalInfo")]
        [ProducesResponseType(typeof(GeneralInfoResponseDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<GeneralInfoResponseDTO>> GetGeneralInfoPerGenre()
        {
            try
            {
                var generalInfo = await _dashboardService.GetGeneralInfoAsync();

                return generalInfo;
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
