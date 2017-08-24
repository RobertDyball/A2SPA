using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace A2SPA.ViewModels.Authorization
{
    public class LogoutViewModel
    {
        [BindNever]
        public string RequestId { get; set; }
    }
}
