namespace FrietZaak.Server.ViewModels
{
    public class OrderLineDTO
    {
        public int MenuItemId { get; set; }
        public string MenuItemName { get; set; }
        public decimal MenuItemPrice { get; set; }
        public decimal MenuItemDiscount { get; set; }
        public int Quantity { get; set; }
    }
}
