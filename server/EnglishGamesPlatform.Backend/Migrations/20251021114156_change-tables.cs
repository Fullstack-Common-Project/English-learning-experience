using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnglishGamesPlatform.Backend.Migrations
{
    /// <inheritdoc />
    public partial class changetables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GrammarQuestionFakeSentences_Sentences_SentenceId",
                table: "GrammarQuestionFakeSentences");

            migrationBuilder.DropIndex(
                name: "IX_GrammarQuestionFakeSentences_SentenceId",
                table: "GrammarQuestionFakeSentences");

            migrationBuilder.DropColumn(
                name: "SentenceId",
                table: "GrammarQuestionFakeSentences");

            migrationBuilder.AddColumn<string>(
                name: "Sentence",
                table: "GrammarQuestionFakeSentences",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Sentence",
                table: "GrammarQuestionFakeSentences");

            migrationBuilder.AddColumn<int>(
                name: "SentenceId",
                table: "GrammarQuestionFakeSentences",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_GrammarQuestionFakeSentences_SentenceId",
                table: "GrammarQuestionFakeSentences",
                column: "SentenceId");

            migrationBuilder.AddForeignKey(
                name: "FK_GrammarQuestionFakeSentences_Sentences_SentenceId",
                table: "GrammarQuestionFakeSentences",
                column: "SentenceId",
                principalTable: "Sentences",
                principalColumn: "SentenceId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
