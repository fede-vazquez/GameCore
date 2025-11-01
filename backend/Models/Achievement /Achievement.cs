using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using Microsoft.AspNetCore.Routing.Constraints;

namespace GameCore.Models
{
    public class Achievement
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MinLength(3)]
        [MaxLength(20)]
        public string Name { get; set; } = null!;

        [MaxLength(50)]
        public string Description { get; set; } = null!;

        [ForeignKey("Game")]
        public int GameId { get; set; }
        public Game Game { get; set; } 
    }
}