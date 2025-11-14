namespace GameCore.Models.Dashboard.DTO
{
    public class GeneralInfoResponseDTO
    {
        public int TotalSales { get; set; }
        public int TotalUsers { get; set; }
        public int TotalGames { get; set; }

        public GeneralInfoResponseDTO(int totalSales, int totalUsers, int totalGames)
        {
            TotalSales = totalSales;
            TotalUsers = totalUsers;
            TotalGames = totalGames;
        }
    }

}
