using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FrietZaak.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddImgProperty : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Img",
                table: "MenuItems",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Img",
                table: "MenuItems");
        }
    }
}
