using System.Threading.Tasks;

namespace A2SPA.Services
{
    public interface ISmsSender
    {
        Task SendSmsAsync(string number, string message);
    }
}
