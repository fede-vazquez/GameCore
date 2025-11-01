using System;

namespace GameCore.Models.Percentege;
using GameCore.Models.Discount;
public class Percentage
{
    public int Id { get; set; }
    public decimal Value { get; set; }
    public ICollection<Discount> Discounts { get; set; } = new List<Discount>();
}
