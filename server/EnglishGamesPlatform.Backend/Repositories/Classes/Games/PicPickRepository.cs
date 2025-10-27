using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.GameInitialDatas;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;
using System;
using System.Collections.Generic;

namespace EnglishGamesPlatform.Backend.Repositories.Classes.Games
{
    public class PicPickRepository : IGeneralGameRepository
    {
        private readonly IImageRepository _imageRepository;
        private readonly ISentenceRepository _sentenceRepository;

        public string GameName => "PicPick";

        public PicPickRepository(IImageRepository imageRepository,ISentenceRepository sentenceRepository)
        {
            _imageRepository= imageRepository;
            _sentenceRepository = sentenceRepository;
        }
        public async Task<GameInitialData?> GetData()
        {
            int questionCount = 10;

            var picPickItems = new List<PicPickItem>();

            var allImages = await _imageRepository.GetAllImagesWithSentenceAsync();

            var selectedImages = allImages.OrderBy(x => Guid.NewGuid()).Take(questionCount).ToList();

            foreach (var questionImage in selectedImages)
            {
                var correctSentence = await _sentenceRepository.GetCorrectSentenceByImageIdAsync(questionImage.ImageId);
                var wrongSentences = await _sentenceRepository.GetRandomWrongSentencesAsync(correctSentence.SentenceId, 3);

                var sentences = new List<string> { correctSentence.SentenceText };
                sentences.AddRange(wrongSentences.Select(s => s.SentenceText));
                sentences = sentences.OrderBy(x => Guid.NewGuid()).ToList();

                var correctIndex = sentences.IndexOf(correctSentence.SentenceText);

                picPickItems.Add(new PicPickItem
                {
                    Id = questionImage.ImageId,
                    ImageUrl = questionImage.ImageUrl,
                    Sentences = sentences.ToArray(),
                    correctIndex = correctIndex
                });
            }

            return new PicPickData
            {
                Items = picPickItems
            };
        }
    }
}
