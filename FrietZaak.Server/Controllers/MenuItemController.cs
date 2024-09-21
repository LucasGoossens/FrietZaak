﻿using FrietZaak.Server.Data;
using FrietZaak.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace FrietZaak.Server.Controllers
{
    [ApiController]
    public class MenuItemController : ControllerBase
    {

        [HttpPost]
        [Route("/menu/item/create")]
        public IActionResult CreateMenuItem([FromBody] MenuItem menuItem)
        {
            //    System.Diagnostics.Debug.WriteLine(menuItem.Id);
            //    System.Diagnostics.Debug.WriteLine(menuItem.Name);
            //    System.Diagnostics.Debug.WriteLine(menuItem.Description);
            //    System.Diagnostics.Debug.WriteLine(menuItem.Price);
            //    System.Diagnostics.Debug.WriteLine(menuItem.CategoryId);            

            using (var context = new FrietZaakContext())
            {
                context.MenuItems.Add(menuItem);
                context.SaveChanges();
                return Ok("Menu item added.");
            }
        }

        [HttpGet]
        [Route("/menu/item/get/{categoryId}")]
        public IActionResult ReadMenuItems([FromBody] int categoryId)
        {
            // category controller haalt alle menuitems op voor nu
            return BadRequest("not implemented.");
        }

        [HttpPut]
        [Route("/menu/item/update/{id}")]
        public IActionResult UpdateMenuItem([FromBody] MenuItem menuItem, int id)
        {
            using (var context = new FrietZaakContext())
            {
                var result = context.MenuItems.FirstOrDefault(m => m.Id == id);
                if (result != null)
                {
                    result.Name = menuItem.Name;
                    result.Description = menuItem.Description;
                    result.Price = menuItem.Price;
                    context.SaveChanges();
                    return Ok("MenuItem updated.");
                }
                else
                {
                    return NotFound();
                }
            }
        }

        [HttpDelete]
        [Route("/menu/item/delete/{id}")]
        public IActionResult DeleteMenuItem(int id)
        {
            using (var context = new FrietZaakContext())
            {
                var entity = context.MenuItems.Find(id);

                if (entity != null)
                {
                    context.MenuItems.Remove(entity);
                    context.SaveChanges();
                    return Ok("Menu item deleted.");
                }
            }
            return NotFound("Menu item does not exist.");
        }

    }
}