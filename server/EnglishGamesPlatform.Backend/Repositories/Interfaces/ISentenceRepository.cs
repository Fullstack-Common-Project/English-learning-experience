﻿using EnglishGamesPlatform.Backend.Models.Entities;

namespace EnglishGamesPlatform.Backend.Repositories.Interfaces
{
    public interface ISentenceRepository
    {
        Task<Sentence?> GetByIdAsync(int id);
        Task<List<Sentence>> GetRandomSentencesAsync(int count);
        Task<List<Sentence>> GetAllAsync();
    }
}
