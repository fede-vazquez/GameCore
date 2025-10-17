using Microsoft.AspNetCore.Mvc;

namespace GameCore.Controllers
{
    [ApiController]
    [Route("health")]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public ObjectResult Get()
        {
            return Ok("ok");
        }
    }
}
