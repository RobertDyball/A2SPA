using System.ComponentModel.DataAnnotations;

namespace A2SPA.ViewModels.Account
{
    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
