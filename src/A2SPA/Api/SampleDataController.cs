using A2SPA.Data;
using A2SPA.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using A2SPA.Helpers;
using System.ComponentModel.DataAnnotations;

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

        // GET: api/sampleData
        [HttpGet]
        public List<TestData> Get()
        {
            return _context.TestData.ToList();
        }

        //// GET: api/sampleData/{1}
        //[HttpGet]
        //public TestData Get(int id)
        //{
        //    return _context.TestData
        //                   .DefaultIfEmpty(null as TestData)
        //                   .FirstOrDefault(a => a.Id == id);
        //}

        // POST api/sampleData
        [HttpPost]
        public TestData Post([FromBody]TestData value)
        {
            //var results = new List<ValidationResult>();
            //if (!value.IsModelValid(results)) return null;
            
            // it's valid isn't it? TODO: add server-side validation here
            value.Id = 0;
            var newTestData = _context.Add(value);
            _context.SaveChanges();
            return newTestData.Entity as TestData;
        }

        // PUT api/sampleData/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]TestData value)
        {
            if (value != null && id != 0) // add validation
            {
                TestData testData = _context.TestData
                                 .DefaultIfEmpty(null as TestData)
                                 .FirstOrDefault(a => a.Id == id);
                if (testData != null)
                {
                    _context.Update(value);
                    _context.SaveChanges();
                }
            }
        }

        // DELETE api/sampleData/5
        [HttpDelete("{id:int}")]
        public bool Delete(int id)
        {
            if (id != 0) // add validation
            {
                TestData testData = _context.TestData
                                 .DefaultIfEmpty(null as TestData)
                                 .FirstOrDefault(a => a.Id == id);
                if (testData != null)
                {
                    _context.Remove(testData);
                    _context.SaveChanges();
                    return true;
                }
            }

            return false;
        }
    }
}
