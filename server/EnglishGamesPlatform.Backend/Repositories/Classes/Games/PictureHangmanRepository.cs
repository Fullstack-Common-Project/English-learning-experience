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

        public PictureHangmanRepository(IImageRepository imageRepository)
        {
            _imageRepository = imageRepository;
        }


        public async Task<GameInitialData?> GetData()
        {
            Image? image = await _imageRepository.GetByIdAsync(await RandomImageIdAsync());

            if (image == null)
            {
                return null;
            }

            return new PictureHangmanData
            {
                ImageUrl = image.ImageUrl,
                TargetWord = image.Word.WordText
            };
        }

        #region Private Methods

        public async Task<int> RandomImageIdAsync()
        {
            int countImages = await _imageRepository.GetCountImagesAsync();
            Random random = new Random();
            int randomImageId = random.Next(1, countImages + 1);
            return randomImageId;
        }
        #endregion

    }
}
