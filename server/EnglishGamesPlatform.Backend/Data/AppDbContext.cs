using EnglishGamesPlatform.Backend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace EnglishGamesPlatform.Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Word> Words { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<GameResult> GameResults { get; set; }
        public DbSet<Sentence> Sentences { get; set; }
        public DbSet<Progress> Progress { get; set; }
        public DbSet<OppositeWord> OppositeWords { get; set; }
        public DbSet<MissingWordSentence> MissingWords { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Word>()
                .HasOne(w => w.Category)
                .WithMany(c => c.Words)
                .HasForeignKey(w => w.CategoryId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Image>()
                .HasOne(i => i.Word)
                .WithMany(w => w.Images)
                .HasForeignKey(i => i.WordId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<GameResult>()
                .HasOne(gr => gr.Game)
                .WithMany(g => g.GameResults)
                .HasForeignKey(gr => gr.GameId);

            modelBuilder.Entity<GameResult>()
                .HasOne(gr => gr.User)
                .WithMany(u => u.GameResults)
                .HasForeignKey(gr => gr.UserId);

            modelBuilder.Entity<Progress>()
                .HasOne(p => p.Game)
                .WithMany(g => g.Progress)
                .HasForeignKey(p => p.GameId);

            modelBuilder.Entity<Progress>()
                .HasOne(p => p.User)
                .WithMany(u => u.Progress)
                .HasForeignKey(p => p.UserId);

            modelBuilder.Entity<OppositeWord>()
                .HasOne(o => o.FirstWord)
                .WithMany()
                .HasForeignKey(o => o.FirstWordId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<OppositeWord>()
                .HasOne(o => o.SecondWord)
                .WithMany()
                .HasForeignKey(o => o.SecondWordId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<MissingWordSentence>()
               .HasOne(mws => mws.Sentence)       
               .WithMany()                        
               .HasForeignKey(mws => mws.SentenceId)
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<MissingWordSentence>()
                .HasOne(mws => mws.CorrectWord)   
                .WithMany()                        
                .HasForeignKey(mws => mws.CorrectWordId)
                .OnDelete(DeleteBehavior.Restrict);


            base.OnModelCreating(modelBuilder);
        }
    }
}
