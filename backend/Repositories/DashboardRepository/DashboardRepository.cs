using GameCore.Config;
using GameCore.Models.Dashboard;
using GameCore.Models.Dashboard.DTO;
using Microsoft.EntityFrameworkCore;

namespace GameCore.Repositories.DashboardRepository
{
    public class DashboardRepository : IDashboardRepository
    {
        private readonly ApplicationDbContext _db;

        public DashboardRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        async public Task<GeneralInfoResponseDTO> GetGeneralInfoAsync()
        {
            int totalSales = await _db.Orders.CountAsync();
            int totalUsers = await _db.Users.CountAsync();
            int totalGames = await _db.Games.CountAsync();
            return new GeneralInfoResponseDTO(totalSales, totalUsers, totalGames);
        }

        async public Task<MonthlySalesPerYearDTO> GetMonthlySalesPerYearAsync(int year)
        {
            var range = await _db.Orders
                .GroupBy(o => 1)
                .Select(g => new
                {
                    FirstYear = g.Min(o => o.CreatedAt.Year),
                    LastYear = g.Max(o => o.CreatedAt.Year)
                })
                .FirstOrDefaultAsync();

            var monthlySales = await _db.Orders
                .Where(o => o.CreatedAt.Year == year)
                .GroupBy(o => o.CreatedAt.Month)
                .Select(g => new MonthlySales
                {
                    MonthNumber = g.Key,
                    TotalSales = g.Count(),
                    TotalSalesWithDiscount = g.Count(s => s.DiscountApplied > 0),

                    TotalAmount = g.Sum(s => s.BasePrice),
                    TotalAmountSavedFromDiscount = g.Sum(s => s.DiscountApplied)
                })
                .ToListAsync();

            return new MonthlySalesPerYearDTO
            {
                FirstSaleYear = range?.FirstYear ?? 0,
                LastSaleYear = range?.LastYear ?? 0,
                MonthlySales = monthlySales
            };
        }
    }
}
