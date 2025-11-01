using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GameCore.Models.Enum
{

    public enum GenreEnum
    {
        Undefined = 0,
        Action,
        FPS,
        Sandbox,
        Comedy,
        Drama,
        SciFi,
        Thriller,
        Horror,
        Romance,
        Documentary,
        Animation
        //etc...
    }

    
    [Index(nameof(Name), IsUnique = true)]
    public class Genres
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MinLength(3)]
        [MaxLength(32)]
        public string Name { get; set; } = null!;
    }
}
