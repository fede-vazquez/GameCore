using System;

namespace GameCore.Models.Game.DTO;

public class LibraryListParametersDTO
{
    //filtros
    public int? GenreId { get; set; }
    public string? Name { get; set; }
    public int? DeveloperId { get; set; }
    public int? Year { get; set; }
    public DateTime BuyDate { get; set; }
    public long TimePlayed { get; set; } = 0;

    //ordenar por
    public string? SortBy { get; set; }
    public bool Ascending { get; set; } = true;

    //Paginacion
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}
