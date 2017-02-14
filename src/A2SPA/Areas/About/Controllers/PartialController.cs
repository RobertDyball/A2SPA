using Microsoft.AspNetCore.Mvc;

namespace A2SPA.Controllers.Areas.About
{
    public class PartialController : Controller
    {
        public IActionResult About1Component() => PartialView();
        public IActionResult About2Component() => PartialView();

    }
}
