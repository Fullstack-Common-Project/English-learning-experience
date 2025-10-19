﻿namespace EnglishGamesPlatform.Backend.Models
{
    public class Response<T>
    {
        public bool IsSuccess { get; set; }

        public int StatusCode { get; set; }

        public string Message { get; set; } = string.Empty;

        public T? Data { get; set; }
    }
}
