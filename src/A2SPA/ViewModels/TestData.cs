using System.ComponentModel.DataAnnotations;

namespace A2SPA.ViewModels
{
    public class TestData
    {
        [Display(Description = "Username", Name = "Username", Prompt = "Username")]
        public string Username { get; set; }

        [Display(Description = "Payment Amount (in dollars)")]
        [DataType(DataType.Currency)]
        public decimal Currency { get; set; }

        [Required, RegularExpression(@"([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})", ErrorMessage = "Please enter a valid email address.")]
        [EmailAddress]
        [Display(Description = "Username", Name = "EmailAddress", ShortName = "Email", Prompt = "Email Address")]
        [DataType(DataType.EmailAddress)]
        public string EmailAddress { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Description = "Password", Name = "Password")]
        public string Password { get; set; }

    }
}
