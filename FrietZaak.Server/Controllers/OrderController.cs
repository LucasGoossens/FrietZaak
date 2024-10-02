using FrietZaak.Server.Data;
using FrietZaak.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FrietZaak.Server.Controllers
{
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly FrietZaakContext _context;


        public OrderController(FrietZaakContext context)
        {
            _context = context;
        }

        public class OrderRequest
        {
            public Dictionary<int, int> ShoppingCart { get; set; }
            public int CustomerId { get; set; }
        }

        [HttpPost]
        [Route("/order/create")]
        public IActionResult CreateOrder([FromBody] OrderRequest orderRequest)
        {
            Order newOrder = new Order();
            newOrder.Finished = false;
            newOrder.CustomerId = orderRequest.CustomerId;

            using (var _context = new FrietZaakContext())
            {
                // eerst lege order aanmaken
                _context.Orders.Add(newOrder);
                _context.SaveChanges();

                // daarna kun je id van object gewoon gebruiken lol
                int createdOrderId = newOrder.Id;

                // shoppingCart heeft als key menuItemId en value quantity
                foreach (KeyValuePair<int, int> keyValuePair in orderRequest.ShoppingCart)
                {
                    OrderLine orderLine = new OrderLine(createdOrderId, keyValuePair.Key, keyValuePair.Value);
                    _context.OrderLines.Add(orderLine);
                    _context.SaveChanges();
                }

                newOrder.CalculateTotalPrice();
            }
            return Ok("New order created");
            // hier misschien dan nog OrderId teruggeven
        }

        public class OrderDTO
        {
            public int Id { get; set; }
            public int CustomerId { get; set; }
            public List<OrderLineDTO> Items { get; set; }
            public decimal? TotalPrice { get; set; }
            public float? Discount { get; set; }
            public bool? Finished { get; set; }
        }

        public class OrderLineDTO
        {
            public int MenuItemId { get; set; }
            public string MenuItemName { get; set; }
            public decimal MenuItemPrice { get; set; }
            public int Quantity { get; set; }
        }


        [HttpGet]
        [Route("/order/get/{userid}")]
        public IActionResult GetCurrentOrder(int userid)
        {
            var order = _context.Orders
                .FirstOrDefault(o => o.CustomerId == userid);

            if (order == null)
                return NotFound();

            var orderLines = _context.OrderLines
                .Include(ol => ol.MenuItem)
                .Where(ol => ol.OrderId == order.Id)
                .Select(ol => new OrderLineDTO
                {
                    MenuItemId = ol.MenuItem.Id,
                    MenuItemName = ol.MenuItem.Name,
                    MenuItemPrice = ol.MenuItem.Price,
                    Quantity = ol.Quantity
                }).ToList();

            var orderDto = new OrderDTO
            {
                Id = order.Id,
                CustomerId = order.CustomerId,
                Items = orderLines,
                TotalPrice = order.TotalPrice,
                Discount = order.Discount,
                Finished = order.Finished
            };

            return Ok(orderDto);
        }

    }
}
