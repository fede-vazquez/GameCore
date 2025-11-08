using GameCore.Config;
using Microsoft.EntityFrameworkCore;
using GameCore.Repositories;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;
using GameCore.Services;
using GameCore.Utils;
using GameCore.Specifications;
using GameCore.Models.Game;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers(/*options =>
{
    options.Filters.Add<GlobalExceptionFilter>();
    options.Filters.Add<LoggingFilter>();
}*/);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "Auth API",
        Description = "An ASP.NET Core Web Api for managing Auth"
    });

    options.AddSecurityDefinition("Token", new OpenApiSecurityScheme()
    {
        BearerFormat = "JWT",
        Description = "JWT Authorization header using the Bearer Scheme.",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Name = "Authorization",
        Scheme = "bearer"
    });

    options.OperationFilter<AuthOperationFilter>();
});
builder.Services.AddAutoMapper(opts => { }, typeof(Mapping));
// DB
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("devConnection"));
});
//registro de servicios
// Services
builder.Services.AddScoped<UserServices>();
builder.Services.AddScoped<AuthServices>();
builder.Services.AddScoped<GameServices>();
builder.Services.AddScoped<GenreServices>();
builder.Services.AddScoped<DeveloperServices>();
builder.Services.AddScoped<IEncoderServices, EncoderServices>();
builder.Services.AddScoped<RolServices>();
builder.Services.AddScoped<PaymentMethodService>();
builder.Services.AddScoped<GameUserServices>();
builder.Services.AddScoped<OrderServices>();
builder.Services.AddScoped<DiscountServices>();
builder.Services.AddScoped<PercentageService>();
//specification
// builder.Services.AddScoped<GameFilterSpecification>();
builder.Services.AddScoped<IGameSpecificationFactory, GameSpecificationFactory>();



//registro de repositorios
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IGameRepository, GameRepository>();
builder.Services.AddScoped<IGenreRepository, GenreRepository>();
builder.Services.AddScoped<IDeveloperRepository, DeveloperRepository>();
builder.Services.AddScoped<IPercentageRepository, PercentageRepository>();
builder.Services.AddScoped<IAchievementRepository, AchievementRepository>();
builder.Services.AddScoped<IPaymentMethodRepository, PaymentMethodRepository>();
builder.Services.AddScoped<IGameUserRepository, GameUserRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IDiscountRepository, DiscountRepository>();
builder.Services.AddScoped<IRolRepository, RolRepository>();
builder.Services.AddScoped<IAchievementUserRepository, AchievementUserRepository>();


//JWT
// Configuración de JWT
var secret = builder.Configuration.GetSection("Secrets:JWT")?.Value?.ToString() ?? string.Empty;
if (string.IsNullOrEmpty(secret) || secret.Length < 32)
{
    // Esto fuerza la detención y te avisa que la clave es inválida
    throw new InvalidOperationException("La clave secreta JWT es nula, vacía o demasiado corta (requiere al menos 32 caracteres). Verifique appsettings.json.");
}
var key = Encoding.UTF8.GetBytes(secret);


builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;

    // Establece JWT como el esquema a usar cuando una acción falla por falta de credenciales (Challenge)
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

    // Establece JWT como el esquema predeterminado general
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    /*
    options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;*/
})
.AddJwtBearer(opts =>
{
    opts.SaveToken = true;
    opts.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
    };
})
.AddCookie(opts =>
{
    opts.Cookie.HttpOnly = true;
    opts.Cookie.SameSite = SameSiteMode.None;
    opts.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    opts.ExpireTimeSpan = TimeSpan.FromDays(1);
});



var app = builder.Build();
app.UseCors(opts =>
{
    opts.AllowAnyMethod();
    opts.AllowAnyHeader();
    opts.AllowAnyOrigin();
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
