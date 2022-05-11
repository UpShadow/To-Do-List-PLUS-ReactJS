using Microsoft.AspNetCore.Mvc;

namespace To_Do_List_PLUS_ReactJS.Controllers
{
    public class ListPlusController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
