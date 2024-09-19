namespace FrietZaak.Server.Models
{
    public class MenuItem
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public float Price { get; set; }
        //public string Img {get; set; }
        public int CategoryId { get; set; }
    
    }
}
