namespace EnglishGamesPlatform.Backend.Models
{
    public class GameData<T>
    {
        public int GameId { get; set; }
        public T? Data { get; set; }
    }
}
