﻿using FrietZaak.Server.Data;
using FrietZaak.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FrietZaak.Server.Controllers
{
    [ApiController]
    public class CategoryController : ControllerBase
    {
        [HttpPost]
        [Route("/menu/category/create")]
        public IActionResult CreateCategory([FromBody] Category category)
        {
            using (var context = new FrietZaakContext())
            {
                context.Categories.Add(category);
                context.SaveChanges();

                return Ok("New Category created.");
            }
        }       

        [HttpGet]
        [Route("/menu/category/get")]
        public IActionResult GetAllCategories()
        {
            using (var context = new FrietZaakContext())
            {
                var categories = context.Categories
                    .Include(c => c.MenuItems);
                // dit haalt nu meteen alle menuitems per category op,
                // individueel fetchen ook nog doen voor filteren?

                return Ok(categories.ToList());
            }
        }

    }
}
