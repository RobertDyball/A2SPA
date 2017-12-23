using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using NSwag.Annotations;

namespace A2SPA.Controllers
{
    [SwaggerIgnore]
    public class PartialController : Controller
    {
        public IActionResult AboutComponent() => PartialView();

        public IActionResult AppComponent() => PartialView();

        public IActionResult ContactComponent() => PartialView();

        public IActionResult DemoComponent() => PartialView();

        public IActionResult IndexComponent() => PartialView();

        public IActionResult LoginComponent() => PartialView();

        public IActionResult RegisterComponent() => PartialView();

        public IActionResult ManageComponent() => PartialView();

        public IActionResult ChangePasswordComponent() => PartialView();
    }
}
