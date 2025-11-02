using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GameCore.Migrations
{
    /// <inheritdoc />
    public partial class AddUserRolRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RolId1",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_RolId1",
                table: "Users",
                column: "RolId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Rols_RolId1",
                table: "Users",
                column: "RolId1",
                principalTable: "Rols",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Rols_RolId1",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_RolId1",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "RolId1",
                table: "Users");
        }
    }
}
