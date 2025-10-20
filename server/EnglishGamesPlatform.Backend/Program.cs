using EnglishGamesPlatform.Backend.Data;
using EnglishGamesPlatform.Backend.Models.Entities;
using EnglishGamesPlatform.Backend.Models.GameDatas;
using EnglishGamesPlatform.Backend.Repositories.Classes;
using EnglishGamesPlatform.Backend.Repositories.Classes.Games;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;
using EnglishGamesPlatform.Backend.Services.Implementations;
using EnglishGamesPlatform.Backend.Services.Interfaces;
using EnglishGamesPlatform.Backend.Utils;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Connect to MySQL database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
);


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCustomServices();

builder.Services.AddScoped<IGenericRepository<User>, UserRepository>();
builder.Services.AddScoped<IGenericService<User>, UserService>();

#endregion

#region PictureHangman

builder.Services.AddScoped<IGeneralGameRepository, PictureHangmanRepository>();
builder.Services.AddScoped<IGeneralGameRepository, PictureHangmanRepositoryFake>();

#endregion

builder.Services.AddScoped<IGeneralGameService, GeneralGameService>();

#endregion


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCustomExceptionHandler();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
