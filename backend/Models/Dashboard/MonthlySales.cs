namespace GameCore.Models.Dashboard
{
    public class MonthlySales
    {
        public int MonthNumber { get; set; }
        public int TotalSales { get; set; }
        public int TotalSalesWithDiscount { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal TotalAmountSavedFromDiscount { get; set; }
    }
}