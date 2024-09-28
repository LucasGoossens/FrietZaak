namespace FrietZaak.Server.Models
{
    public class OrderLine
    {
        
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int MenuItemId { get; set; }
        public MenuItem? MenuItem { get; set; }
        public Order? Order { get; set; }
        public int Quantity { get; set; }
        public OrderLine(int orderId, int menuItemId, int quantity)
        {
            OrderId = orderId;
            MenuItemId = menuItemId;
            Quantity = quantity;
        }



    }
}
