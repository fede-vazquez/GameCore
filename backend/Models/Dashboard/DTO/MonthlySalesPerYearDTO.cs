namespace GameCore.Models.Dashboard.DTO
{
    public class MonthlySalesPerYearDTO
    {
        public int FirstSaleYear { get; set; }
        public int LastSaleYear { get; set; }
        public List<MonthlySales> MonthlySales { get; set; } = new List<MonthlySales>();
    }
}
