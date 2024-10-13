using FrietZaak.Server.Data;
using FrietZaak.Server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;

namespace FrietZaak.Server.Controllers
{
    [ApiController]
    public class MenuItemController : ControllerBase
    {
        private readonly FrietZaakContext _context;

        
        public MenuItemController(FrietZaakContext context)
        {
            _context = context;
        }


        [HttpPost]
        [Route("/menu/item/create")]
        public IActionResult CreateMenuItem([FromBody] MenuItem menuItem)
        {
            //    System.Diagnostics.Debug.WriteLine(menuItem.Id);
            //    System.Diagnostics.Debug.WriteLine(menuItem.Name);
            //    System.Diagnostics.Debug.WriteLine(menuItem.Description);
            //    System.Diagnostics.Debug.WriteLine(menuItem.Price);
            //    System.Diagnostics.Debug.WriteLine(menuItem.CategoryId);            


            _context.MenuItems.Add(menuItem);
            _context.SaveChanges();
            return Ok("Menu item added.");

        }

        [HttpGet]
        [Route("/menu/item/get/{menuitemid}")]
        public IActionResult GetMenuItemById(int menuitemid)
        {

            try
            {
                var item = _context.MenuItems.FirstOrDefault(i => i.Id == menuitemid);               
                return Ok(item);
            }
            catch
            {
                return NotFound();
            }

        }

        [HttpGet]
        [Route("/menu/item/get/discount")]
        public IActionResult GetDiscountItems()
        {
            int numberOfResults = 3;
            try
            {
                var items = _context.MenuItems
                    .Where(m => m.Discount > 0)
                    .Take(numberOfResults)
                    .ToList();
                return Ok(items);
            }
            catch
            {
                return NotFound();
            }
        }
        //[HttpGet]
        //[Route("/menu/item/get/{categoryId}")]
        //public IActionResult ReadMenuItems([FromBody] int categoryId)
        //{
        //    // category controller haalt alle menuitems op voor nu
        //    return BadRequest("not implemented.");
        //}

        public class MenuUpdateDTO
        {
            public string Name { get; set; }
            public string  Description { get; set; }
            public decimal Price { get; set; }
            public decimal Discount { get; set; }
        }

        [HttpPut]
        [Route("/menu/item/update/{id}")]
        public IActionResult UpdateMenuItem([FromBody] MenuUpdateDTO menuItem, int id)
        {

            var result = _context.MenuItems.FirstOrDefault(m => m.Id == id);
            if (result != null)
            {
                result.Name = menuItem.Name;
                result.Description = menuItem.Description;
                result.Price = menuItem.Price;
                result.Discount = menuItem.Discount;
                _context.SaveChanges();
                return Ok();
            }
            else
            {
                return NotFound();
            }

        }

        [HttpDelete]
        [Route("/menu/item/delete/{id}")]
        public IActionResult DeleteMenuItem(int id)
        {

            var entity = _context.MenuItems.Find(id);

            if (entity != null)
            {
                _context.MenuItems.Remove(entity);
                _context.SaveChanges();
                return Ok("Menu item deleted.");
            }

            return NotFound("Menu item does not exist.");
        }

        [HttpPost]
        [Route("/menu/item/totalPrice")]
        public IActionResult CalculateTotalPrice(Dictionary<int, decimal> menuItems)
        {           

            decimal totalPrice = 0;

            foreach (KeyValuePair<int, decimal> entry in menuItems)
            {
                var menuItem = _context.MenuItems.Find(entry.Key);
                if (menuItem != null)
                {
                    totalPrice += (menuItem.Price - menuItem.Discount) * entry.Value;
                }
            }

            return Ok(totalPrice);
        }

    }
}
