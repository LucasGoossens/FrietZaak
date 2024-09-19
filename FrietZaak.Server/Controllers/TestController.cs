using FrietZaak.Server.Data;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.Eventing.Reader;

namespace FrietZaak.Server.Controllers
{
    public class TestController : ControllerBase
    {
        [HttpPost]
        [Route("/test/create")]
        public IActionResult CreateDb()
        {

            using (var context = new FrietZaakContext())
            {
                if (context.Database.EnsureCreated())
                {
                    return Ok("Datebase created.");
                }
                else
                {
                    return BadRequest();                    
                }
            }
        }
        [HttpPost]
        [Route("/test/delete")]
        public IActionResult DeleteDb()
        {

            using (var context = new FrietZaakContext())
            {
                if (context.Database.EnsureDeleted())
                {
                    return Ok("Database deleted.");
                }
                else
                {
                    return BadRequest();
                }
            }
        }
    }

}
