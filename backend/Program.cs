using GameCore.Config;
using GameCore.Repository;
using GameCore.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Swagger Config 
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(opts =>
{
    opts.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1"
    });
});

// DB
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("devConnection"));
});


//Services Dependency Injection
builder.Services.AddScoped<AuthService>();

// REPOSITORY D.I.

builder.Services.AddScoped<IUserRepository, UserRepository>();

// External packages config
builder.Services.AddAutoMapper(opts => { }, typeof(AutoMapping));


//! -------------------------------------
//! esto es lo ultimo que se debe ejecutar
//! -------------------------------------
var app = builder.Build();

app.UseCors(opts => { });

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
