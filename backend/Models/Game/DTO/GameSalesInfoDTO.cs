namespace GameCore.Models.Game.DTO
{
    public class GameSalesInfo
    {
        public int GameId { get; set; }
        public string Title { get; set; } = null!;
        public decimal TotalSales { get; set; }
        public decimal TotalRevenue { get; set; }
    }
}