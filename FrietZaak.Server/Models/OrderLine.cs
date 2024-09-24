namespace FrietZaak.Server.Models
{
    public class OrderLine
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public MenuItem? MenuItem { get; set; }
        public Order Order { get; set; }
        public int Quantity { get; set; }






    }
}
