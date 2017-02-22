using A2SPA.Data;
using A2SPA.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

namespace A2SPA.Api
{
    [Authorize]
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
            // pick up the last value, so we see something happening
            // TODO: replace with get, add get(id) method
            return _context.TestData.DefaultIfEmpty(null as TestData).LastOrDefault();
        }

        // POST api/values
        [HttpPost]
        public TestData Post([FromBody]TestData value)
        {
            // it's valid isn't it? TODO: add server-side validation here
            value.Id = 0;
            var newTestData =_context.Add(value);
            _context.SaveChanges();
            return newTestData.Entity as TestData;
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]TestData value)
        {
            // TODO: add code for put - update/replace
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            // TODO: add code for delete
        }
    }
}
