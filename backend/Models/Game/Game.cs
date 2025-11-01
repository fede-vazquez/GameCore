using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GameCore.Models
{

    [Index(nameof(Title), IsUnique = true)]
    public class Game
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = null!;

        [MaxLength(500)]
        public string Description { get; set; } = null!;

        [Required]
        [Range(0.50, 199.99)]
        public decimal Price { get; set; }

        [Required]
        public DateTime ReleaseDate { get; set; }
        public string ImageUrl { get; set; } = null!;

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedAt { get; set; }

        public DateTime DeletedAt { get; set; }


        //https://www.learnentityframeworkcore.com/configuration/data-annotation-attributes/foreignkey-attribute
        [ForeignKey("Developer")]
        public int DeveloperId { get; set; }
        public Developer Developer { get; set; }

    }
    
}