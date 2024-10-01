using FrietZaak.Server.Data;
using FrietZaak.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FrietZaak.Server.Controllers
{

    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly FrietZaakContext _context;
        public User LoggedInUser { get; set; }
        public UserController(FrietZaakContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("/user/create")]
        public IActionResult CreateUser([FromBody] User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
            return Ok("User created.");
        }

        public class UserDTO
        {
            public string Email { get; }
            public string Password { get; set; }

            public UserDTO(string email, string password)
            {
                this.Email = email;
                this.Password = password;
            }
            
        }

        [HttpPost]
        [Route("/user/login")]
        public IActionResult LoginUser([FromBody] UserDTO user)
        {
            var foundUser = _context.Users
                .FirstOrDefault(m => m.Email == user.Email);

            if (foundUser == null)
            {
                return NotFound("Account with this email does not exist.");
            }

            if (foundUser.Password != user.Password)
            {
                return Unauthorized("Password does not match.");
            }
            else
            {
                LoggedInUser = foundUser;
                return Ok(foundUser);
            }

        }

        [HttpGet]
        [Route("/user/getall")]
        public IActionResult GetAllUsers()
        {
            return Ok(_context.Users.ToList());
           
        }

    }
}
