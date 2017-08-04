using System.Linq;
using A2SPA.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace A2SPA.Data
{
    public class DbInitializer
    {
        private readonly A2spaContext _context;

        public DbInitializer()
        {
        }

        public DbInitializer(A2spaContext context)
        {
            _context = context;
        }

        public void Initialize()
        {
            // performs any outstanding migrations.
            if (_context.Database.GetPendingMigrations().Any())
            {
                _context.Database.Migrate();
            }

            // Look for any test data.
            if (_context.TestData.Any())
            {
                return;   // DB has been seeded
            }

            var testData = new TestData
            {
                Username = "JaneDoe",
                EmailAddress = "jane.doe@example.com",
                Password = "LetM@In!",
                Currency = 321.45M
            };

            _context.TestData.Add(testData);
            _context.SaveChanges();
        }
    }
}
