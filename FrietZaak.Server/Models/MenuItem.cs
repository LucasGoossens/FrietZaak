﻿namespace FrietZaak.Server.Models
{
    public class MenuItem
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public string? Img { get; set; }
        
        public int CategoryId { get; set; }
        public decimal Discount { get; set; }

        public virtual Category? Category { get; set; }
    }
}
