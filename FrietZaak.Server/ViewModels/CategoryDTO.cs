using FrietZaak.Server.Models;

namespace FrietZaak.Server.ViewModels
{

    public class CategoryDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<MenuItem>? MenuItems { get; set; }
    }
}
