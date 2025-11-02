using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GameCore.Migrations
{
    /// <inheritdoc />
    public partial class DBTest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_Discount_EndDate_GreaterThan_StartDate",
                table: "Discounts");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddCheckConstraint(
                name: "CK_Discount_EndDate_GreaterThan_StartDate",
                table: "Discounts",
                sql: "[EndDate] > [StartDate]");
        }
    }
}
