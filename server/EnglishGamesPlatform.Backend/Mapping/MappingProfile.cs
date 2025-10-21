using AutoMapper;
using EnglishGamesPlatform.Backend.Models.DTOs.Entities_DTOs;
using EnglishGamesPlatform.Backend.Models.Entities;

namespace EnglishGamesPlatform.Backend.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            #region Game , GameDTO

            CreateMap<Game, GameDTO>();

            #endregion

            #region GameResult , GameResultDTO

            CreateMap<GameResultDTO, GameResult>();

            #endregion

        }
    }
}
