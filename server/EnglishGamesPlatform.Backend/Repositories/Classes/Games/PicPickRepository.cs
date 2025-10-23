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
            // var questionImage = (await _imageRepository.GetRandomImagesAsync(1)).First();
            var questionImage = await _imageRepository.GetRandomImageWithSentenceAsync();

            Console.WriteLine($"Selected ImageId: {questionImage.ImageId}, ImageUrl: {questionImage.ImageUrl}");


            var correctSentence = await _sentenceRepository.GetCorrectSentenceByImageIdAsync(questionImage.ImageId);

            var wrongSentences = await _sentenceRepository.GetRandomWrongSentencesAsync(correctSentence.SentenceId,3);

            var sentences = new List<string> { correctSentence.SentenceText };
            sentences.AddRange(wrongSentences.Select(s => s.SentenceText));
            sentences = sentences.OrderBy(x => Guid.NewGuid()).ToList();
            var correctIndex = sentences.IndexOf(correctSentence.SentenceText);          

            return new PicPickData
            {
                Id = questionImage.ImageId,
                ImageUrl = questionImage.ImageUrl,
                Sentences = sentences.ToArray(),
                correctIndex = correctIndex
            };
        }
    }
}
