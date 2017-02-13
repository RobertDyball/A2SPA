using A2SPA.Data;
using A2SPA.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
        public async Task<List<TestData>> Get()
        {
            return await _context.TestData.ToListAsync();
        }

        // GET: api/values
        [HttpGet("{id}")]
        public async Task<TestData> Get(int id)
        {
            return await _context.TestData
                                 .DefaultIfEmpty(null as TestData)
                                 .FirstOrDefaultAsync(a => a.Id == id);
        }

        // POST api/values
        [HttpPost]
        public async void Post([FromBody]TestData value)
        {
            if (value != null) // add validation
            {
                await _context.AddAsync(value);
                await _context.SaveChangesAsync();
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async void Put(int id, [FromBody]TestData value)
        {
            if (value != null && id != 0) // add validation
            {
                TestData testData = await _context.TestData
                                 .DefaultIfEmpty(null as TestData)
                                 .FirstOrDefaultAsync(a => a.Id == id);
                if (testData != null)
                {
                    _context.Update(value);
                    await _context.SaveChangesAsync();
                }
            }
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async void Delete(int id)
        {
            if (id != 0) // add validation
            {
                TestData testData = await _context.TestData
                                 .DefaultIfEmpty(null as TestData)
                                 .FirstOrDefaultAsync(a => a.Id == id);
                if (testData != null)
                {
                    _context.Remove(testData);
                    await _context.SaveChangesAsync();
                }
            }
        }
    }
}
