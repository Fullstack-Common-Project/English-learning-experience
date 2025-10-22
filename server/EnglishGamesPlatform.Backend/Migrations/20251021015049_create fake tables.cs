using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnglishGamesPlatform.Backend.Migrations
{
    /// <inheritdoc />
    public partial class createfaketables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GrammarSentences");

            migrationBuilder.CreateTable(
                name: "GrammarQuestions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CorrectSentenceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GrammarQuestions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GrammarQuestions_Sentences_CorrectSentenceId",
                        column: x => x.CorrectSentenceId,
                        principalTable: "Sentences",
                        principalColumn: "SentenceId",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "GrammarQuestionFakeSentences",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    GrammarQuestionId = table.Column<int>(type: "int", nullable: false),
                    SentenceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GrammarQuestionFakeSentences", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GrammarQuestionFakeSentences_GrammarQuestions_GrammarQuestio~",
                        column: x => x.GrammarQuestionId,
                        principalTable: "GrammarQuestions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GrammarQuestionFakeSentences_Sentences_SentenceId",
                        column: x => x.SentenceId,
                        principalTable: "Sentences",
                        principalColumn: "SentenceId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_GrammarQuestionFakeSentences_GrammarQuestionId",
                table: "GrammarQuestionFakeSentences",
                column: "GrammarQuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_GrammarQuestionFakeSentences_SentenceId",
                table: "GrammarQuestionFakeSentences",
                column: "SentenceId");

            migrationBuilder.CreateIndex(
                name: "IX_GrammarQuestions_CorrectSentenceId",
                table: "GrammarQuestions",
                column: "CorrectSentenceId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GrammarQuestionFakeSentences");

            migrationBuilder.DropTable(
                name: "GrammarQuestions");

            migrationBuilder.CreateTable(
                name: "GrammarSentences",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CorrectSentenceId = table.Column<int>(type: "int", nullable: false),
                    FakeSentence1 = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FakeSentence2 = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FakeSentence3 = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GrammarSentences", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GrammarSentences_Sentences_CorrectSentenceId",
                        column: x => x.CorrectSentenceId,
                        principalTable: "Sentences",
                        principalColumn: "SentenceId",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_GrammarSentences_CorrectSentenceId",
                table: "GrammarSentences",
                column: "CorrectSentenceId");
        }
    }
}
