using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.Entities;
using EnglishGamesPlatform.Backend.Models.GameInitialDatas;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnglishGamesPlatform.Backend.Repositories.Classes.Games
{
    public class DoubleVisionRepository : IGeneralGameRepository
    {

        private readonly IImageRepository _imageRepository;
        private readonly IWordRepository _wordRepository;

        public DoubleVisionRepository(IWordRepository wordRepository, IImageRepository imageRepository)
        {
            _imageRepository = imageRepository;
            _wordRepository = wordRepository;
        }

        public string GameName => "Double Vision";

        public async Task<GameInitialData?> GetData()
        {
            // Get a random word to be the main word
            var mainWordList = await _wordRepository.GetRandomWordsAsync(1);
            var mainWord = mainWordList.FirstOrDefault();

            if (mainWord == null)
            {
                return null;
            }

            // Get correct image for the main word
            var correctImages = await _imageRepository.GetRandomImagesAsync(1);
            var correctImage = correctImages.FirstOrDefault(img => img.WordId == mainWord.WordId);

            if (correctImage == null)
            {
                return null;
            }

            var otherImages = (await _imageRepository.GetRandomImagesAsync(3))
                .Where(img => img.WordId != mainWord.WordId)
                .ToList();

            // Combine correct image with other images and shuffle
            var allImages = new List<Image>();
            allImages.Add(correctImage);
            allImages.AddRange(otherImages);

            var rnd = new Random();
            allImages = allImages.OrderBy(x => rnd.Next()).ToList();


            var options = new List<DoubleVisionData.Option>();
            foreach (var img in allImages)
            {
                var word = await _wordRepository.GetByIdAsync(img.WordId);
                options.Add(new DoubleVisionData.Option
                {
                    ImageUrl = img.ImageUrl,
                    Label = word.WordText
                });
            }

            int correctIndex = allImages.FindIndex(img => img.WordId == mainWord.WordId);

            return new DoubleVisionData
            {
                MainWord = mainWord.WordText,
                Options = options,
                CorrectIndex = correctIndex
            };
        }
    }
}
