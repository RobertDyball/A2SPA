using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace A2SPA.Controllers
{
    public class HomeController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;

        public HomeController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            ViewBag.RootPath = new PathString("/");
                //Request.Scheme.ToString() + "://" + Request.Host.Value.ToString() + Request.Path.ToString();
            // from https://blog.mariusschulz.com/2016/05/22/getting-the-web-root-path-and-the-content-root-path-in-asp-net-core
            ViewBag.webRootPath = _hostingEnvironment.WebRootPath;
            ViewBag.contentRootPath = _hostingEnvironment.ContentRootPath;
        }

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
