using EnglishGamesPlatform.Backend.Models;
using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.Entities;
using EnglishGamesPlatform.Backend.Models.GameDatas;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;

namespace EnglishGamesPlatform.Backend.Repositories.Classes.Games
{
    public class PictureHangmanRepository : IGeneralGameRepository
    {
        public string GameName => "Picture Hangman";

        private readonly IImageRepository _imageRepository;



        public  Task<GameInitialData> GetData()
        {
            throw new NotImplementedException();
            //return new PictureHangmanData
            //{


            //Image = new Image()
            //{
            //    ImageId = 1,
            //    ImageUrl = "Images/Image_1.jpg",
            //    Word = new Word(),
            //    WordId = 1
            //}

            //};
        }

       

    }
}
