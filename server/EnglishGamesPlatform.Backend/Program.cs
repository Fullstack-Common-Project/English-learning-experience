<<<<<<< HEAD
﻿using EnglishGamesPlatform.Backend.Data;
=======
using EnglishGamesPlatform.Backend.Data;
>>>>>>> origin/main-v2
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
builder.Services.AddSwaggerGen();

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

#region PictureHangman

builder.Services.AddScoped<IGeneralGameService, GeneralGameService>();
builder.Services.AddScoped<IGeneralGameRepository, PictureHangmanRepository>();
builder.Services.AddScoped<IGeneralGameRepository, OppositeQuestRepository>();
builder.Services.AddScoped<IGeneralGameRepository, MiniWordleRepository>();
builder.Services.AddScoped<IGeneralGameRepository, LetterChaosRepository>();
<<<<<<< HEAD
=======
builder.Services.AddScoped<IGeneralGameRepository, TwinWordsGameRepository>();

>>>>>>> origin/main-v2

#endregion


#endregion 

builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IImageRepository, ImageRepository>();
builder.Services.AddScoped<ISentenceRepository, SentenceRepository>();
builder.Services.AddScoped<IWordRepository, WordRepository>();
builder.Services.AddScoped<IOppositeWordRepository, OppositeWordRepository>();
<<<<<<< HEAD
builder.Services.AddScoped<IGeneralGameRepository, GuessMaster20Repository>();
=======
builder.Services.AddScoped<ITwinWordRepository, TwinWordRepository>();
>>>>>>> origin/main-v2



#endregion

builder.Services.AddCustomServices();

//builder.Services.AddAuthentication(options =>
//{
//    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
//    options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
//})
//.AddCookie()
//.AddGoogle(options =>
//{
//    options.ClientId = builder.Configuration["Authentication:Google:ClientId"]!;
//    options.ClientSecret = builder.Configuration["Authentication:Google:ClientSecret"]!;
//    options.CallbackPath = "/signin-google";
//});

var app = builder.Build();

<<<<<<< HEAD

=======
>>>>>>> origin/main-v2
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.MapGet("/login-google", async (HttpContext context) =>
//{
//    await context.ChallengeAsync(GoogleDefaults.AuthenticationScheme,
//        new AuthenticationProperties { RedirectUri = "/" });
//});

app.UseCustomExceptionHandler();

app.UseHttpsRedirection();
app.UseCors("AllowAll");

<<<<<<< HEAD
app.UseAuthentication();

app.UseAuthorization();

=======
app.UseAuthorization();

app.UseAuthentication();

>>>>>>> origin/main-v2
app.MapControllers();

app.Run();
