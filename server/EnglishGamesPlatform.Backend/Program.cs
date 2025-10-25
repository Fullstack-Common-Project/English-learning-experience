using EnglishGamesPlatform.Backend.Data;
using EnglishGamesPlatform.Backend.Extensions;
using EnglishGamesPlatform.Backend.Repositories.Classes;
using EnglishGamesPlatform.Backend.Repositories.Classes.Entities;
using EnglishGamesPlatform.Backend.Repositories.Classes.Games;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;
using EnglishGamesPlatform.Backend.Services.Classes;
using EnglishGamesPlatform.Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

# region Connect to MySQL DB

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
);

#endregion


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });

    // הוספת Authorization Header
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
            },
            new string[] {}
        }
    });
});


#region AutoMapper

builder.Services.AddAutoMapper(typeof(Program));

#endregion

#region Dependency Injection

#region Game

builder.Services.AddScoped<IGameRepository, GameRepository>();
builder.Services.AddScoped<IGameService, GameService>();

#endregion

#region GameResult

builder.Services.AddScoped<IGameResultRepository, GameResultRepository>();

#endregion

#region General Game

builder.Services.AddScoped<IGeneralGameService, GeneralGameService>();
builder.Services.AddScoped<IGeneralGameRepository, PictureHangmanRepository>();
builder.Services.AddScoped<IGeneralGameRepository, OppositeQuestRepository>();
builder.Services.AddScoped<IGeneralGameRepository, MiniWordleRepository>();
builder.Services.AddScoped<IGeneralGameRepository, LetterChaosRepository>();
builder.Services.AddScoped<IGeneralGameRepository, MemoryMatchSynonymsRepository>();
builder.Services.AddScoped<IGeneralGameRepository, GrammarGuruRepository>();
#endregion 

builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IImageRepository, ImageRepository>();
builder.Services.AddScoped<ISentenceRepository, SentenceRepository>();
builder.Services.AddScoped<IWordRepository, WordRepository>();
builder.Services.AddScoped<IOppositeWordRepository, OppositeWordRepository>();
builder.Services.AddScoped<ITwinWordRepository, TwinWordRepository>();
builder.Services.AddScoped<IGrammarQuestionRepository, GrammarQuestionRepository>();
builder.Services.AddScoped<IFakeSentenceRepository, FakeSentenceRepository>();

#endregion

builder.Services.AddCustomServices();
builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
})
.AddCookie()
.AddGoogle(options =>
{
    options.ClientId = builder.Configuration["Authentication:Google:ClientId"]!;
    options.ClientSecret = builder.Configuration["Authentication:Google:ClientSecret"]!;
    options.CallbackPath = "/signin-google";
})
.AddJwtBearer("JwtBearer", options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
        ValidAudience = builder.Configuration["JwtSettings:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:SecretKey"]!)
        )
    };
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.MapGet("/login-google", async (HttpContext context) =>
{
    await context.ChallengeAsync(GoogleDefaults.AuthenticationScheme,
        new AuthenticationProperties { RedirectUri = "/" });
});


app.UseCustomExceptionHandler();

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();



app.MapControllers();

app.Run();
