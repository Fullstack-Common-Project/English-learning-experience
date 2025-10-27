using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnglishGamesPlatform.Backend.Migrations
{
    /// <inheritdoc />
    public partial class MissingWordSentence1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MissingWords",
                columns: table => new
                {
                    MissingWordSentenceId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    SentenceId = table.Column<int>(type: "int", nullable: false),
                    CorrectWordId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MissingWords", x => x.MissingWordSentenceId);
                    table.ForeignKey(
                        name: "FK_MissingWords_Sentences_SentenceId",
                        column: x => x.SentenceId,
                        principalTable: "Sentences",
                        principalColumn: "SentenceId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MissingWords_Words_CorrectWordId",
                        column: x => x.CorrectWordId,
                        principalTable: "Words",
                        principalColumn: "WordId",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_MissingWords_CorrectWordId",
                table: "MissingWords",
                column: "CorrectWordId");

            migrationBuilder.CreateIndex(
                name: "IX_MissingWords_SentenceId",
                table: "MissingWords",
                column: "SentenceId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MissingWords");
        }
    }
}
