using FrietZaak.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace FrietZaak.Server.Data
{
    public class FrietZaakContext : DbContext
    {
        public DbSet<User> Users { get; set; }
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
            modelBuilder.Entity<Customer>()
              .HasBaseType<User>(); // Maps Customer to User table (TPH or TPT depending on config)

            modelBuilder.Entity<Employee>()
                .HasBaseType<User>(); // Maps Employee to User table (TPH or TPT depending on config)

            // Define the primary key for the User class
            modelBuilder.Entity<User>()
                .HasKey(u => u.Id);

            modelBuilder.Entity<User>()
              .HasDiscriminator<string>("UserType")  // Add a discriminator column
              //.HasValue<User>("User")
              .HasValue<Customer>("Customer")
              .HasValue<Employee>("Employee");

            // Configure Customer to Order relationship (One-to-Many)
            modelBuilder.Entity<Order>()
                .HasOne(o => o.Customer)
                .WithMany(c => c.OrderHistory) // Assuming Customer has a collection of Orders
                .HasForeignKey(o => o.CustomerId)
                .OnDelete(DeleteBehavior.Restrict); // Restrict delete if there are orders

            // Configure OrderLine to MenuItem relationship (Many-to-One)
            modelBuilder.Entity<OrderLine>()
                .HasOne(ol => ol.MenuItem)
                .WithMany() // Assuming MenuItem has no reference back to OrderLine
                .HasForeignKey(ol => ol.MenuItemId)
                .OnDelete(DeleteBehavior.Cascade); // Delete OrderLines when MenuItem is deleted

            // Configure OrderLine to Order relationship (Many-to-One)
            modelBuilder.Entity<OrderLine>()
                .HasOne(ol => ol.Order)
                .WithMany(o => o.Items) // Order has many OrderLines
                .HasForeignKey(ol => ol.OrderId)
                .OnDelete(DeleteBehavior.Cascade); // Delete OrderLines when Order is deleted

            // Configure MenuItem to Category relationship (Many-to-One)
            modelBuilder.Entity<MenuItem>()
                .HasOne(mi => mi.Category)
                .WithMany(c => c.MenuItems) // Category has many MenuItems
                .HasForeignKey(mi => mi.CategoryId)
                .OnDelete(DeleteBehavior.Restrict); // Restrict delete if MenuItems exist in the category

            // Configure Order entity properties
            modelBuilder.Entity<Order>()
                .Property(o => o.TotalPrice)
                .HasColumnType("decimal(18,2)"); // Decimal precision for currency

            modelBuilder.Entity<Order>()
                .Property(o => o.Discount)
                .HasColumnType("decimal(18,2)"); // Discount as float

            modelBuilder.Entity<Order>()
                .Property(o => o.Finished)
                .IsRequired(); // Required boolean value

            // Configure MenuItem entity properties
            modelBuilder.Entity<MenuItem>()
                .Property(mi => mi.Price)
                .HasColumnType("decimal(18,2)");
            
            modelBuilder.Entity<MenuItem>()
                .Property(mi => mi.Discount)
                .HasColumnType("decimal(18,2)");
        }

    }
}
