using System.ComponentModel.DataAnnotations;

namespace GameCore.Models.Genre.DTO
{
    public class CreateGenreDTO
    {
        [Required]
        [MinLength(4)]
        [MaxLength(50)]
        public string Name { get; set; } = null!;
    }
}
