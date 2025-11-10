using GameCore.Models.Game.DTO;

namespace GameCore.Models.Dashboard.DTO
{
    public class GenreGeneralInfoResponseDTO
    {
        public int TotalGames { get; set; }
        public List<GetGameDTO> LastGamesAdded { get; set; } = new List<GetGameDTO>();
        public List<GetGameDTO> BestSellingGames { get; set; } = new List<GetGameDTO> { };
    }
}
