using System;

namespace GameCore.Models.Game.DTO;

public class LibraryListPagedResultDTO
{
    public IEnumerable<GetGameForLibraryDTO> Items { get; set; } = Enumerable.Empty<GetGameForLibraryDTO>();
    public int TotalCount { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public int TotalPages { get; set; }
}
