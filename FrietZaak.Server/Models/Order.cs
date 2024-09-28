namespace FrietZaak.Server.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int? CustomerId { get; set; } // nullable want kunt bestellen zonder customer account
        public Customer? Customer { get; set; }
        public List<OrderLine>? Items { get; set; }
        public decimal TotalPrice { get; set; }
        public float Discount { get; set; }
        public bool Finished { get; set; }


        public void CalculateTotalPrice()
        {
            TotalPrice = 0;
            foreach(var items in Items)
            {
                TotalPrice += items.MenuItem.Price;
            }
        }
    }
}
