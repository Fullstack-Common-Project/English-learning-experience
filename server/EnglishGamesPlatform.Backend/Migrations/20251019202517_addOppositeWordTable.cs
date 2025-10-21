using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnglishGamesPlatform.Backend.Migrations
{
    /// <inheritdoc />
    public partial class addOppositeWordTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OppositeWords",
                columns: table => new
                {
                    OppositeWordId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    FirstWordId = table.Column<int>(type: "int", nullable: false),
                    SecondWordId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OppositeWords", x => x.OppositeWordId);
                    table.ForeignKey(
                        name: "FK_OppositeWords_Words_FirstWordId",
                        column: x => x.FirstWordId,
                        principalTable: "Words",
                        principalColumn: "WordId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OppositeWords_Words_SecondWordId",
                        column: x => x.SecondWordId,
                        principalTable: "Words",
                        principalColumn: "WordId",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_OppositeWords_FirstWordId",
                table: "OppositeWords",
                column: "FirstWordId");

            migrationBuilder.CreateIndex(
                name: "IX_OppositeWords_SecondWordId",
                table: "OppositeWords",
                column: "SecondWordId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OppositeWords");
        }
    }
}
