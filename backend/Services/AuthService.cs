using System;

namespace GameCore.Services;

using GameCore.Models.User;
using GameCore.Models.User.DTO;
using GameCore.Utils;
using AutoMapper;
using System.Net;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
public class AuthServices
{
    private readonly UserServices _userServices;
    private readonly IEncoderServices _encoderServices;
    private readonly IMapper _mapper;
    private readonly IConfiguration _config;
    internal readonly string _secret;

    public AuthServices(UserServices userServices, IEncoderServices encoderServices, IConfiguration config, IMapper mapper)
    {
        _userServices = userServices;
        _encoderServices = encoderServices;
        _config = config;
        _secret = _config.GetSection("Secrets:JWT")?.Value?.ToString() ?? string.Empty;
        _mapper = mapper;
    }

    async public Task<List<UserWithoutPassDTO>> GetUsersAsync()
    {
        return await _userServices.GetAllAsync();
    }

    async public Task<UserWithoutPassDTO> RegisterAsync(RegisterDTO register)
    {
        var user = await _userServices.GetOneByUsernameAsync(register.Username);
        if (user != null)
        {
            throw new HttpResponseError(HttpStatusCode.BadRequest, "User already exists");
        }

        var created = await _userServices.CreateOneAsync(register);
        return created;
    }

    async public Task<LoginResponseDTO> LoginAsync(LoginDTO login, HttpContext context)
    {
        string datum = login.Username;
        var user = await _userServices.GetOneByUsernameAsync(datum);

        if (user == null)
        {
            throw new HttpResponseError(HttpStatusCode.BadRequest, "Invalid credentials");
        }

        bool IsMatch = _encoderServices.Verify(login.Password, user.Password);

        if (!IsMatch)
        {
            throw new HttpResponseError(HttpStatusCode.BadRequest, "Invalid credentials");
        }

        await SetCookieAsync(user, context);

        string token = GenerateJwt(user);

        return new LoginResponseDTO
        {
            Token = token,
            User = _mapper.Map<UserWithoutPassDTO>(user)
        };
    }

    async public Task LogoutAsync(HttpContext context)
    {
        await context.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
    }

    async public Task SetCookieAsync(User user, HttpContext context)
    {
        var claims = new List<Claim>
            {
                new Claim("id", user.Id.ToString())
            };

        if (user.Rol != null)
        {

            var claim = new Claim(ClaimTypes.Role, user.Rol.Name);
            claims.Add(claim);
        }

        var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        var principal = new ClaimsPrincipal(identity);

        await context.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            principal,
            new AuthenticationProperties
            {
                IsPersistent = true,
                ExpiresUtc = DateTime.UtcNow.AddDays(1),
            }
        );
    }

    public string GenerateJwt(User user)
    {
        var key = Encoding.UTF8.GetBytes(_secret);
        var symmetricKey = new SymmetricSecurityKey(key);

        var credentials = new SigningCredentials(
            symmetricKey,
            SecurityAlgorithms.HmacSha256Signature
        );

        var claims = new ClaimsIdentity();
        claims.AddClaim(new Claim("id", user.Id.ToString()));

        if (user.Rol != null)
        {

            var claim = new Claim(ClaimTypes.Role, user.Rol.Name);
            claims.AddClaim(claim);

        }

        var tokenDescriptor = new SecurityTokenDescriptor()
        {
            Subject = claims,
            Expires = DateTime.UtcNow.AddDays(1),
            SigningCredentials = credentials
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenConfig = tokenHandler.CreateToken(tokenDescriptor);
        string token = tokenHandler.WriteToken(tokenConfig);
        return token;
    }
}
