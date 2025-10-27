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
            int rounds = 7;

            //  Fetch only the random images needed for all rounds (with Word included)
            var randomImages = await _imageRepository.GetRandomImagesAsync(rounds * 4);

            //  Exit if there aren't enough images
            if (randomImages == null || randomImages.Count < rounds * 3)
                return null;

            //  Shuffle all images once
            randomImages = randomImages.OrderBy(x => Guid.NewGuid()).ToList();

            int index = 0;

            for (int i = 0; i < rounds; i++)
            {
                //  Select the correct image for this round
                var correctImage = randomImages[index++];
                if (correctImage?.Word == null) continue;

                var mainWord = correctImage.Word;

                //  Select 3 incorrect images (images that do NOT match the main word)
                var otherImages = randomImages
                    .Where(img => img.WordId != mainWord.WordId)
                    .Skip(index)
                    .Take(3)
                    .ToList();

                //  Combine correct and incorrect images, then shuffle
                var allImages = new List<Image> { correctImage };
                allImages.AddRange(otherImages);
                allImages = allImages.OrderBy(x => Guid.NewGuid()).ToList();

                //  Create options with image URLs and labels
                var options = allImages.Select(img => new DoubleVisionData.Option
                {
                    ImageUrl = img.ImageUrl,
                    Label = img.Word.WordText
                }).ToList();

                //  Find the correct index in the options list
                int correctIndex = allImages.FindIndex(img => img.WordId == mainWord.WordId);

                //  Add the round to game data
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