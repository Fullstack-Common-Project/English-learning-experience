using EnglishGamesPlatform.Backend.Data;
using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.Entities;
using EnglishGamesPlatform.Backend.Models.GameInitialDatas;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using static EnglishGamesPlatform.Backend.Models.GameInitialDatas.DoubleVisionData;

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
            var data = new DoubleVisionData();

            int rounds = 5;

            for (int i = 0; i < rounds; i++)
            {
                // Random mages and Words Selection for Double Vision Game
                var correctImage = (await _imageRepository.GetRandomImagesAsync(1)).FirstOrDefault();
                if (correctImage == null) return null;

                // The correct word to the image
                var mainWord = await _wordRepository.GetByIdAsync(correctImage.WordId);
                if (mainWord == null) return null;

                // 3 Incorrect images that do not match the main word
                var otherImages = (await _imageRepository.GetRandomImagesAsync(5))
                                  .Where(img => img.WordId != mainWord.WordId)
                                  .Take(3)
                                  .ToList();

                // Combine correct image with other images and shuffle
                var allImages = new List<Image> { correctImage };
                allImages.AddRange(otherImages);
                allImages = allImages.OrderBy(x => Guid.NewGuid()).ToList();

                // Create options 
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

                data.AddItem(new DoubleVisionItem
                {
                    MainWord = mainWord.WordText,
                    Options = options,
                    CorrectIndex = correctIndex
                });
            }
            return data;
        }

    }
}