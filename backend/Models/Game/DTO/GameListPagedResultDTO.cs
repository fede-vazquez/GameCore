using System;

namespace GameCore.Models.Game.DTO;

using GameCore.Models.Game;

public class GameListPagedResultDTO
{
    public IEnumerable<GetGameDTO> Items { get; set; } = Enumerable.Empty<GetGameDTO>();
    public int TotalCount { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);

}
