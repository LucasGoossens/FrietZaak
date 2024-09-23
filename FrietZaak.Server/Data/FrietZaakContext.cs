using FrietZaak.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace FrietZaak.Server.Data
{
    public class FrietZaakContext : DbContext
    {
        public DbSet<Person> Persons { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<MenuItem> MenuItems { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderLine> OrderLines { get; set; }
        public DbSet<Category> Categories { get; set; }

        // database wordt aangemaakt in TestController.cs, is handiger met swagger tijdens testen
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string connection = "Data Source=.;Initial Catalog=FrietZaakDb;Integrated Security=true; TrustServerCertificate=True;";
            optionsBuilder.UseSqlServer(connection);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }

    }
}
