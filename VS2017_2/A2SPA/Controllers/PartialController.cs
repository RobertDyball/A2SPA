using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;

namespace A2SPA.Controllers
{
    [SwaggerIgnore]
    public class PartialController : Controller
    {
        public IActionResult AboutComponent() => PartialView();

        public IActionResult AppComponent() => PartialView();

        public IActionResult ContactComponent() => PartialView();

        public IActionResult DemoComponent() {
            ViewData["Message"] = " is built using Angular 5 and ASP.net Core 2";
            return PartialView();
        }
        public IActionResult IndexComponent() => PartialView();

        public IActionResult LoginComponent() => PartialView();

        public IActionResult RegisterComponent() => PartialView();

        public IActionResult ManageComponent() => PartialView();

        public IActionResult ChangePasswordComponent() => PartialView();
    }
}
