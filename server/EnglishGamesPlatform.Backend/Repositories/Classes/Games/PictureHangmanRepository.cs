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
            List<Image>? images = await _imageRepository.GetRandomImagesAsync(3);

            if (images == null)
            {
                return null;
            }

            List<ImageWordPair> pairs = images.Select(i => new ImageWordPair
            {
                ImageUrl = i.ImageUrl,
                TargetWord = CapitalizeWord(i.Word.WordText)
            }).ToList();

            return new PictureHangmanData
            {
                Pairs = pairs
            };
        }

        #region Private Methods

        private string CapitalizeWord(string text)
        {
            if (string.IsNullOrWhiteSpace(text))
                return text;

            text = text.Trim().ToLower();
            string[] words = text.Split(' ', StringSplitOptions.RemoveEmptyEntries);

            for (int i = 0; i < words.Length; i++)
            {
                string word = words[i];
                if (words.Length > 0)
                {
                    words[i] = char.ToUpper(word[0]) + word.Substring(1);
                }
            }

            return string.Join(' ', words);
        }

        #endregion
    }
}
