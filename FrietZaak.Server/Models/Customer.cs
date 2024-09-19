namespace FrietZaak.Server.Models
{
    public class Customer: Person
    {
        public List<Order>? OrderHistory { get; set; }
                 
    }
}
