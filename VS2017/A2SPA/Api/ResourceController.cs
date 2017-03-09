using A2SPA.Models;
using AspNet.Security.OAuth.Validation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace A2SPA.Api
{
    [Route("api")]
    public class ResourceController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public ResourceController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [Authorize(ActiveAuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
        [HttpGet("message")]
        public async Task<IActionResult> GetMessage()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return BadRequest();
            }

            return Content($"{user.UserName} has been successfully authenticated.");
        }
    }
}