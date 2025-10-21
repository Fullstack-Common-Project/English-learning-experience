using EnglishGamesPlatform.Backend.Repositories.Classes.Games;
using EnglishGamesPlatform.Backend.Repositories;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;
using EnglishGamesPlatform.Backend.Services.Classes;
using EnglishGamesPlatform.Backend.Services.Implementations;
using EnglishGamesPlatform.Backend.Services.Interfaces;
using EnglishGamesPlatform.Backend.Utils;

namespace EnglishGamesPlatform.Backend.Extensions
{
    public static class ServiceCollectionExtensions
    {

        public static IServiceCollection AddCustomServices(this IServiceCollection services)
        {

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
            });
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddSingleton<TokenService>();
            services.AddScoped<IGeneralGameService, GeneralGameService>();

        

            // Register custom services here
            // services.AddScoped<IMyService, MyService>();
            return services;
        }
    }
}
