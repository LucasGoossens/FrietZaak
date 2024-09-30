namespace FrietZaak.Server.Models
{
    public class Customer: User
    {
        public List<Order>? OrderHistory { get; set; }
                 
    }
}
