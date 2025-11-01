using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using GameCore.Models.Enum;

namespace GameCore.Models
{
    public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public decimal BasePrice { get; set; }

        [Required]
        [ForeignKey("Discount")]
        public int DiscountId { get; set; } 
        public Discount Discount { get; set; } 

        [Required]
        [ForeignKey("PaymentMethod")]
        public int PaymentMethodId { get; set; } 
        public PaymentMethods PaymentMethod { get; set; } 

        [Required]
        [ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; }

        [Required]
        [ForeignKey("Game")]
        public int GameId { get; set; }
        public Game Game { get; set; }
    }
}