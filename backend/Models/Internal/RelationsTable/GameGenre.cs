using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using GameCore.Models.Enum;

namespace GameCore.Models.Relations
{
    public class GameGenre
    {
        [Key]
        [ForeignKey("Game")]
        public int GameId { get; set; }

        public Game Game { get; set; }

        [Key]
        [ForeignKey("Genre")]
        public int GenreId { get; set; }

        public Genres Genre { get; set; }

                 
    }
}