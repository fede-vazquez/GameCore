using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GameCore.Models.Enum
{
    enum RolEnum{
        Admin = 0,
        User,
        Guest
    }

       [Index(nameof(Name), IsUnique = true)]
    public class Roles
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