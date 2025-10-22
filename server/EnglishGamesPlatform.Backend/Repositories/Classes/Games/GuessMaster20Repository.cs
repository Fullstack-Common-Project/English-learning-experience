using EnglishGamesPlatform.Backend.Data;
using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;

namespace EnglishGamesPlatform.Backend.Repositories.Classes.Games
{
    public class GuessMaster20Repository : IGeneralGameRepository
    {
        public string GameName => "GuessMaster 20";
        private readonly AppDbContext _db;
        public GuessMaster20Repository(AppDbContext db)
        {
            _db = db;
        }

        public Task<GameInitialData?> GetData()
        {
            throw new NotImplementedException();
        }
        //public async Task<GameInitialData?> GetData()
        //{
        //    var candidates= await _db.Words.Where(w=>w.)

        //}

    }
}
