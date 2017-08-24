using System.Threading.Tasks;

namespace A2SPA.Services
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
}
