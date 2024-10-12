 namespace FrietZaak.Server.ViewModels
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public string? CustomerName { get; set; }
        public List<OrderLineDTO> Items { get; set; }
        public decimal? TotalPrice { get; set; }
        public decimal? Discount { get; set; }
        public bool? Finished { get; set; }
        public bool TransactionCompleted { get; set; }
    }
}
