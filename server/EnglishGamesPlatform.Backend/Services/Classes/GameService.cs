using AutoMapper;
using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.DTOs.Entities_DTOs;
using EnglishGamesPlatform.Backend.Models.Entities;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;
using EnglishGamesPlatform.Backend.Services.Interfaces;
using System.Net;

namespace EnglishGamesPlatform.Backend.Services.Classes
{
    public class GameService : IGameService
    {
        private readonly IGameRepository _gameRepository;
        private readonly IMapper _mapper;

        public GameService(IGameRepository gameRepository, IMapper mapper)
        {
            _gameRepository = gameRepository;
            _mapper = mapper;
        }

        public async Task<Response<IEnumerable<GameDTO>>> GetAllAsync()
        {
            try
            {
                IEnumerable<Game> games = await _gameRepository.GetAllAsync();
                IEnumerable<GameDTO> gameDTOs = _mapper.Map<IEnumerable<GameDTO>>(games);
                if (games != null)
                {
                    return new Response<IEnumerable<GameDTO>>
                    {
                        StatusCode = HttpStatusCode.OK,
                        IsSuccess = true,
                        Message = "Games retrieved successfully.",
                        Data = gameDTOs
                    };
                }
                else
                {
                    return new Response<IEnumerable<GameDTO>>
                    {
                        StatusCode = HttpStatusCode.NotFound,
                        IsSuccess = false,
                        Message = "No games found.",
                        Data = null
                    };
                }
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<GameDTO>>
                {
                    StatusCode = HttpStatusCode.InternalServerError,
                    IsSuccess = false,
                    Message = $"An error occurred while retrieving games: {ex.Message}",
                    Data = null
                };
            }
        }
    }
}
