using GameCore.Models.Dashboard.DTO;
using System.Linq.Expressions;

namespace GameCore.Repositories.DashboardRepository
{
    public interface IDashboardRepository
    {
        Task<GeneralInfoResponseDTO> GetGeneralInfoAsync();
        Task<MonthlySalesPerYearDTO> GetMonthlySalesPerYearAsync(int year);
    }
}
