using GameCore.Models.Dashboard.DTO;
using GameCore.Repositories.DashboardRepository;
using GameCore.Utils;
using System.Net;

namespace GameCore.Services
{

    public class DashboardService
    {
        private readonly IDashboardRepository _repo;

        public DashboardService(IDashboardRepository repo)
        {
            _repo = repo;
        }

        public async Task<MonthlySalesPerYearDTO> GetMonthlySalesPerYearAsync(int year)
        {
            if (year <= 2000)
            {
                throw new HttpResponseError(HttpStatusCode.BadRequest, "Year must be greater than 2000");
            }

            var monthlySales = await _repo.GetMonthlySalesPerYearAsync(year);

            if (monthlySales.MonthlySales.Count == 0)
            {
                throw new HttpResponseError(HttpStatusCode.NotFound, $"No sales data found for the year {year}");
            }

            return monthlySales;
        }

        public async Task<GenreGeneralInfoResponseDTO> GetGenreGeneralInfoAsync(string genreName)
        {
            if (string.IsNullOrEmpty(genreName))
            {
                throw new HttpResponseError(HttpStatusCode.BadRequest, "Genre name is required");
            }

            var genreInfo = await _repo.GetGenreGeneralInfoAsync(genreName);

            if (genreInfo.TotalGames == 0)
            {
                throw new HttpResponseError(HttpStatusCode.NotFound, $"No games found for genre '{genreName}'");
            }

            return genreInfo;
        }
    }
}
