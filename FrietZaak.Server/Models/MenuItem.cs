namespace FrietZaak.Server.Models
{
    public class MenuItem
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public string? Img { get; set; }
        //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
        public int CategoryId { get; set; }
        public decimal Discount { get; set; }

        public virtual Category? Category { get; set; }
    }
}
