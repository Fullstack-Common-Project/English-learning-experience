using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnglishGamesPlatform.Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddTwinWordEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TwinWords",
                columns: table => new
                {
                    TwinWordId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    BaseWordId = table.Column<int>(type: "int", nullable: false),
                    SynonymWordId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TwinWords", x => x.TwinWordId);
                    table.ForeignKey(
                        name: "FK_TwinWords_Words_BaseWordId",
                        column: x => x.BaseWordId,
                        principalTable: "Words",
                        principalColumn: "WordId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TwinWords_Words_SynonymWordId",
                        column: x => x.SynonymWordId,
                        principalTable: "Words",
                        principalColumn: "WordId",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_TwinWords_BaseWordId",
                table: "TwinWords",
                column: "BaseWordId");

            migrationBuilder.CreateIndex(
                name: "IX_TwinWords_SynonymWordId",
                table: "TwinWords",
                column: "SynonymWordId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TwinWords");
        }
    }
}
