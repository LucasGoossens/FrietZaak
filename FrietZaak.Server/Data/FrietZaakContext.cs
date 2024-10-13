using FrietZaak.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace FrietZaak.Server.Data
{
    public class FrietZaakContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<MenuItem> MenuItems { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderLine> OrderLines { get; set; }
        public DbSet<Category> Categories { get; set; }

        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string connection = "Data Source=.;Initial Catalog=FrietZaakDb;Integrated Security=true; TrustServerCertificate=True;";
            optionsBuilder.UseSqlServer(connection);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>()
              .HasBaseType<User>(); 

            modelBuilder.Entity<Employee>()
                .HasBaseType<User>(); 

            
            modelBuilder.Entity<User>()
                .HasKey(u => u.Id);

            modelBuilder.Entity<User>()
              .HasDiscriminator<string>("UserType")  
              //.HasValue<User>("User")
              .HasValue<Customer>("Customer")
              .HasValue<Employee>("Employee");

            
            modelBuilder.Entity<Order>()
                .HasOne(o => o.Customer)
                .WithMany(c => c.OrderHistory) 
                .HasForeignKey(o => o.CustomerId)
                .OnDelete(DeleteBehavior.Restrict); 

            
            modelBuilder.Entity<OrderLine>()
                .HasOne(ol => ol.MenuItem)
                .WithMany() 
                .HasForeignKey(ol => ol.MenuItemId)
                .OnDelete(DeleteBehavior.Cascade); 

            
            modelBuilder.Entity<OrderLine>()
                .HasOne(ol => ol.Order)
                .WithMany(o => o.Items) 
                .HasForeignKey(ol => ol.OrderId)
                .OnDelete(DeleteBehavior.Cascade); 

            
            modelBuilder.Entity<MenuItem>()
                .HasOne(mi => mi.Category)
                .WithMany(c => c.MenuItems) 
                .HasForeignKey(mi => mi.CategoryId)
                .OnDelete(DeleteBehavior.Restrict); 

            
            modelBuilder.Entity<Order>()
                .Property(o => o.TotalPrice)
                .HasColumnType("decimal(18,2)"); 

            modelBuilder.Entity<Order>()
                .Property(o => o.Discount)
                .HasColumnType("decimal(18,2)"); 

            modelBuilder.Entity<Order>()
                .Property(o => o.Finished)
                .IsRequired(); 

            
            modelBuilder.Entity<MenuItem>()
                .Property(mi => mi.Price)
                .HasColumnType("decimal(18,2)");
            
            modelBuilder.Entity<MenuItem>()
                .Property(mi => mi.Discount)
                .HasColumnType("decimal(18,2)");
        }

    }
}
