using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GameCore.Models.Enum
{

public enum PaymentMethodsEnum
{
    Undefined = 0, 
    CreditCard,
    DebitCard,
    BankTransfer,
    Cash,
    Cryptocurrency,
}
    

    [Index(nameof(Name), IsUnique = true)]
    public class PaymentMethods
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = null!;
    }
}