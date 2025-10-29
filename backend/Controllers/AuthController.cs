using GameCore.Services;
using Microsoft.AspNetCore.Mvc;

namespace GameCore.Controllers
{
    [Route("v1/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService aServ)
        {
            _authService = aServ;
        }

        
    }

}