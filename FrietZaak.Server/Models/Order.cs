using FrietZaak.Server.Data;
using Microsoft.EntityFrameworkCore;

namespace FrietZaak.Server.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int CustomerId { get; set; } 
        public Customer Customer { get; set; }
        public List<OrderLine>? Items { get; set; }
        public decimal? TotalPrice { get; set; }
        public decimal? Discount { get; set; }
        // onderscheid tussen finished en completed is finished is dat de order klaar is om op te halen,
        // completed = transactie voltooid
        public bool? Finished { get; set; }
        public bool TransactionCompleted { get; set; } = false;

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
                    .Sum(ol => (ol.MenuItem.Price - ol.MenuItem.Discount) * ol.Quantity);

                var order = context.Orders.FirstOrDefault(o => o.Id == this.Id);
                order.TotalPrice = this.TotalPrice;
                context.SaveChanges();
            }

        }
    }
}
