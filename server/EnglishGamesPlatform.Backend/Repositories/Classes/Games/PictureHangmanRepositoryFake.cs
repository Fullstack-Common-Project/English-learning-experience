using EnglishGamesPlatform.Backend.Models;
using EnglishGamesPlatform.Backend.Models.Entities;
using EnglishGamesPlatform.Backend.Models.GameDatas;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;

namespace EnglishGamesPlatform.Backend.Repositories.Classes.Games
{
    public class PictureHangmanRepositoryFake : IGeneralGameRepository
    {
        public int GameID => 2;

        public GameInitialData GetData()
        {
            return new PictureHangmanData
            {
                Image = new Image()
                {
                    ImageId = 1,
                    ImageUrl = "Images/Image_2.jpg",
                    Word = new Word(),
                    WordId = 1
                }
            };
        }
    }
}
