using Microsoft.AspNetCore.Mvc;

namespace A2SPA.Controllers
{
    public class PartialController : Controller
    {
        public IActionResult AppComponent() => PartialView();

        public IActionResult ContactComponent() => PartialView();

        public IActionResult IndexComponent() => PartialView();
    }
}
