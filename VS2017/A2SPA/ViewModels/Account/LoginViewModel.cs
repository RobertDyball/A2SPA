using System.ComponentModel.DataAnnotations;

namespace A2SPA.ViewModels.Account
{
    public class LoginViewModel
    {
        [Required, RegularExpression(@"([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})", ErrorMessage = "Please enter a valid email address.")]
        [EmailAddress]
        [Display(Name = "Username", ShortName = "Email", Prompt = "Email Address (username)")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }
    }
}
