using EnglishGamesPlatform.Backend.Repositories.Interfaces;

namespace EnglishGamesPlatform.Backend.Repositories.Classes
{
    public class PictureHangmanRepository : IPictureHangmanRepository
    {
        public async Task<IEnumerable<string>> GetAll()
        {
            List<string> list = new ();
            list.Add("Picture 1");
            list.Add("Picture 2");
            list.Add("Picture 3");

            return list;
        }
    }
}
