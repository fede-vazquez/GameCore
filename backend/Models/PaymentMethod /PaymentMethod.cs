using System;

namespace GameCore.Models.PaymentMethod;

using GameCore.Models.Order;
public class PaymentMethod
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;

    public ICollection<Order> Orders { get; set; } = new List<Order>();


}
