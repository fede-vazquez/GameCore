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
// using Microsoft.AspNetCore.Authentication.Cookies;
using GameCore.Enums;
using GameCore.Models.Rol;

public class AuthServices
{
    private readonly UserServices _userServices;
    private readonly IEncoderServices _encoderServices;
    private readonly RolServices _rolServices;

    private readonly IMapper _mapper;
    private readonly IConfiguration _config;
    internal readonly string _secret;


    public AuthServices(UserServices userServices,
    RolServices rolServices, IEncoderServices encoderServices, IConfiguration config, IMapper mapper)
    {
        _userServices = userServices;
        _rolServices = rolServices;
        _encoderServices = encoderServices;
        _config = config;
        //_secret = _config.GetSection("Secrets:JWT")?.Value?.ToString() ?? string.Empty;
        _secret = _config["JWT_SECRET"] ?? string.Empty;

        if (string.IsNullOrEmpty(_secret))
        {
            throw new InvalidOperationException("La clave 'JWT_SECRET' no se encontró en la configuración.");
        }
        _mapper = mapper;
    }

    async public Task<UserListPagedResultDTO> GetUsersAsync(UserListParametersDTO? parameters)
    {
        return await _userServices.GetAllAsync(parameters);
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

        //await SetCookieAsync(user, context);

        string token = await GenerateJwt(user);

        return new LoginResponseDTO
        {
            Token = token,
            User = _mapper.Map<UserWithoutPassDTO>(user)
        };
    }
    /*
        async public Task LogoutAsync(HttpContext context)
        {
            await context.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        }
        /*
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
        */
    async public Task<string> GenerateJwt(User user)
    {
        var key = Encoding.UTF8.GetBytes(_secret);
        var symmetricKey = new SymmetricSecurityKey(key);

        var credentials = new SigningCredentials(
            symmetricKey,
            SecurityAlgorithms.HmacSha256Signature
        );
        // buscamos el rol a traves del atributo RolId de User
        var rol = await _rolServices.GetOneByIdAsync(user.RolId);


        var claims = new ClaimsIdentity();
        claims.AddClaim(new Claim("id", user.Id.ToString()));

        if (user.Rol != null)
        {

            var claim = new Claim(ClaimTypes.Role, rol.Name);
            claims.AddClaim(claim);

        }
        else
        {
            throw new Exception("User has no role");
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
