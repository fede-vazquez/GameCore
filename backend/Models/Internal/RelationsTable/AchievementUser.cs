using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using GameCore.Models.Enum;

namespace GameCore.Models.Relations
{
    public class AchievementUser
    {
        [Key]
        [ForeignKey("User")]
        public int UserId { get; set; }

        public User User { get; set; }

        [Key]
        [ForeignKey("Achievement")]
        public int AchievementId { get; set; }

        public Achievement Achievement { get; set; }


        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime DateAchieved  { get; set; }
                 
    }
}