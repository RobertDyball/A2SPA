//using A2SPA.Models;
//using A2SPA.Models.ManageViewModels;
//using AspNet.Security.OAuth.Validation;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Identity;
//using Microsoft.AspNetCore.Mvc;
//using NSwag.Annotations;
//using System.Threading.Tasks;

//namespace A2SPA.Api
//{
//    [SwaggerIgnore]
//    [Authorize]
//    public class ManageController : Controller
//    {
//        private readonly UserManager<ApplicationUser> _userManager;

//        public ManageController(UserManager<ApplicationUser> userManager)
//        {
//            _userManager = userManager;
//        }

//        [Authorize(ActiveAuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
//        [HttpPost("~/manage/changePassword")]
//        public async Task<IActionResult> ChangePassword([FromBody]ChangePasswordViewModel passwordUpdate)
//        {
//            var user = await _userManager.GetUserAsync(User);
//            if (user != null)
//            {
//                var passwordChanged = await _userManager.ChangePasswordAsync(user, passwordUpdate.OldPassword, passwordUpdate.NewPassword);

//                if (passwordChanged.Succeeded)
//                {
//                    return Json(Ok("password successfully changed."));
//                }

//                return Json(BadRequest("Password not changed, user not found"));
//            }

//            return Json(NotFound("Password not changed, user not found"));
//        }

//        // to be completed
//        //[Authorize(ActiveAuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
//        //[HttpGet("~/manage/logout")]
//        //public async Task<IActionResult> Logout()
//        //{
//        //    var user = await _userManager.GetUserAsync(User);
//        //    if (user == null)
//        //    {
//        //        // add logout , destroy token
//        //        return Json(BadRequest("User not found"));
//        //    }

//        //    return Json(Ok($"{user.UserName} successfully logged out."));
//        //}
//    }
//}
