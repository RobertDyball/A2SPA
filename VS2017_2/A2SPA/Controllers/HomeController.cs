using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;

namespace A2SPA.Controllers
{
    [SwaggerIgnore]
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            ViewData["Title"] = "Home";
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
