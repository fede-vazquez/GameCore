using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Numerics;
using GameCore.Models.Enum;

namespace GameCore.Models.Relations
{
    public class GameUser
    {
        [Key]
        [ForeignKey("User")]
        public int UserId { get; set; }

        public User User { get; set; }

        [Key]
        [ForeignKey("Game")]
        public int GameId { get; set; }

        public Game Game { get; set; }


        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime BuyDate { get; set; }

        public BigInteger TimePlayed { get; set; } = 0;
    }
}