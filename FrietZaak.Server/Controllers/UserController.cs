﻿using FrietZaak.Server.Data;
using FrietZaak.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            if (user == null)
            {
                return NotFound("User not found.");
            }

            _context.Entry(user).State = EntityState.Detached;

            if (user.Id == 1)
            {

                var employee = new Employee
                {

                    Name = user.Name,
                    Email = user.Email,
                    Password = user.Password,
                    IsAdmin = true

                };

                _context.Employees.Add(employee);


                _context.SaveChanges();


            }
            else
            {

                var customer = new Customer
                {

                    Name = user.Name,
                    Email = user.Email,
                    Password = user.Password,

                };

                _context.Customers.Add(customer);

                _context.SaveChanges();
            }

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
            var users = _context.Users.ToList();
             
            return Ok(users);
        }


    }
}
