using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GameCore.Migrations
{
    /// <inheritdoc />
    public partial class SeedDeGeneroAny : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.InsertData(
                table: "Genres",
                columns: new[] { "Id", "Name" },
                values: new object[] { 11, "Any" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Genres",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "IsActive", "Password", "RolId", "Username" },
                values: new object[] { 1, new DateTime(2025, 11, 10, 10, 30, 0, 0, DateTimeKind.Unspecified), "admin@example.com", true, "admin1234", 3, "admin" });
        }
    }
}
