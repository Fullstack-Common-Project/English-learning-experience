using EnglishGamesPlatform.Backend.Models;
using System.Net;

namespace EnglishGamesPlatform.Backend.Models
{
    public class Response
    {
        public bool IsSuccess { get; set; }

        public HttpStatusCode StatusCode { get; set; }

        public string Message { get; set; } = string.Empty;
    }

    public class Response<T> : Response
    {
        public T? Data { get; set; }
    }
}

