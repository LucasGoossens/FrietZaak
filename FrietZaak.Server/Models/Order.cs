using FrietZaak.Server.Data;
using Microsoft.EntityFrameworkCore;

namespace FrietZaak.Server.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int CustomerId { get; set; } 
        public Customer? Customer { get; set; }
        public List<OrderLine>? Items { get; set; }
        public decimal? TotalPrice { get; set; }
        public float? Discount { get; set; }
        public bool? Finished { get; set; }

        public Order()
        {

        }
        public void CalculateTotalPrice()
        {            
            using (var context = new FrietZaakContext())
            {
                //lijp
                this.TotalPrice = context.OrderLines
                    .Where(ol => ol.OrderId == this.Id)                    
                    .Sum(ol => ol.MenuItem.Price * ol.Quantity);

                var order = context.Orders.FirstOrDefault(o => o.Id == this.Id);
                order.TotalPrice = this.TotalPrice;
                context.SaveChanges();
            }

        }
    }
}
