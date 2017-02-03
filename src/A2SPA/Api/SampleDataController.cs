using Microsoft.AspNetCore.Mvc;
using A2SPA.ViewModels;
using A2SPA.Data;
using System.Linq;

namespace A2SPA.Api
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private readonly A2spaContext _context;

        public SampleDataController(A2spaContext context)
        {
            _context = context;
        }
        
        // GET: api/values
        [HttpGet]
        public TestData Get()
        {
            return _context.TestData.DefaultIfEmpty(null as TestData).FirstOrDefault();
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]TestData value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]TestData value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
