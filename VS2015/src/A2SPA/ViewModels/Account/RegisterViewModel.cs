using System.ComponentModel.DataAnnotations;

namespace A2SPA.ViewModels.Account
{
    public class RegisterViewModel : LoginViewModel
    {
        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password Verification")]
        public string VerifyPassword { get; set; }
    }
}
