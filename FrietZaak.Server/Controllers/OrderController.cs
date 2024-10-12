using FrietZaak.Server.Data;
using FrietZaak.Server.Models;
using FrietZaak.Server.ViewModels;
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


        [HttpGet]
        [Route("/order/get/{userid}")]
        public IActionResult GetCurrentOrder(int userid)
        {
            var order = _context.Orders
                .Where(o => o.TransactionCompleted == false)
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
                    Quantity = ol.Quantity,
                    MenuItemDiscount = ol.MenuItem.Discount
                }).ToList();

            var orderDto = new OrderDTO
            {
                Id = order.Id,
                CustomerId = order.CustomerId,
                Items = orderLines,
                TotalPrice = order.TotalPrice,
                Discount = order.Discount,
                Finished = order.Finished,
                TransactionCompleted = order.TransactionCompleted
            };

            return Ok(orderDto);
        }

        [HttpGet]
        [Route("order/get/test")]
        public IActionResult GetAllOrders()
        {
            var orders = _context.Orders;
            return Ok(orders);
        }


        [HttpGet]
        [Route("/order/get/notfinished")]
        public IActionResult GetAllUnfinishedOrders()
        {
            var orders = _context.Orders
                .Include(o => o.Customer)
                .Where(o => o.TransactionCompleted == false)
                .Select(order => new OrderDTO
                {
                    Id = order.Id,
                    CustomerId = order.CustomerId,
                    CustomerName = order.Customer.Name,
                    Items = _context.OrderLines
                        .Where(ol => ol.OrderId == order.Id)
                        .Select(ol => new OrderLineDTO
                        {
                            MenuItemId = ol.MenuItem.Id,
                            MenuItemName = ol.MenuItem.Name,
                            MenuItemPrice = ol.MenuItem.Price,
                            Quantity = ol.Quantity
                        }).ToList(),
                    TotalPrice = order.TotalPrice,
                    Discount = order.Discount,
                    Finished = order.Finished,
                    TransactionCompleted = order.TransactionCompleted
                })
                .ToList();

            if (orders == null || orders.Count == 0)
            {
                return NotFound();
            }

            return Ok(orders);
        }


        [HttpPut]
        [Route("/order/setfinished/{id}")]
        public IActionResult SetOrderAsFinished(int id)
        {
            var order = _context.Orders
                .FirstOrDefault(o => o.Id == id);

            if (order == null)
            {
                return NotFound(new { message = "Order not found" });
            }

            order.Finished = true;
            _context.SaveChanges();


            return Ok(new { message = $"Order {id} set as finished.", orderId = id });

        }

        [HttpPut]
        [Route("order/transactioncompleted/{id}")]
        public IActionResult CompleteTransaction(int id)
        {
            var order = _context.Orders
                .FirstOrDefault(o => o.Id == id);

            if (order == null)
            {
                return NotFound(new { message = "Order not found" });
            }

            order.TransactionCompleted = true;
            _context.SaveChanges();


            return Ok(new { message = $"Order {id} transaction completed.", orderId = id });

        }


        

        [HttpGet]
        [Route("order/admin/statistics")]
        public IActionResult GetStatistics()
        {

            var statistics = _context.OrderLines
                .Where(ol => ol.Order.TransactionCompleted == true)
                .GroupBy(ol => new { ol.MenuItemId, ol.MenuItem.Name, ol.MenuItem.Price })
                .Select(g => new StatisticsViewModel
                {
                    MenuItemId = g.Key.MenuItemId,
                    MenuItemName = g.Key.Name,
                    MenuItemPrice = g.Key.Price,
                    Quantity = g.Sum(ol => ol.Quantity) 
                })
                .ToList();


            if (statistics == null || statistics.Count == 0)
            {
                return NotFound();
            }

            return Ok(statistics);       




        }



    }
}

