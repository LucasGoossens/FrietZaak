using FrietZaak.Server.Data;
using FrietZaak.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace FrietZaak.Server.Controllers
{
    [ApiController]
    public class OrderController : ControllerBase
    {
        [HttpPost]
        [Route("/order/create")]
        public IActionResult CreateOrder(Dictionary<int, int> shoppingCart)
        {          
           Order newOrder = new Order();

            using (var _context = new FrietZaakContext())
            {
                // eerst lege order aanmaken
                _context.Orders.Add(newOrder);
                _context.SaveChanges();

                // daarna kun je id van object gewoon gebruiken lol
                int createdOrderId = newOrder.Id;

                // shoppingCart heeft als key menuItemId en value quantity
                foreach (KeyValuePair<int, int> keyValuePair in shoppingCart)
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
    }
}
