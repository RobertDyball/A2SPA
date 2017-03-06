using A2SPA.Data;
using A2SPA.Helpers;
using A2SPA.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

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

        // GET: api/sampleData/{1}
        [HttpGet("{id}")]
        public TestData GetById(int id)
        {
            return _context.TestData
                           .DefaultIfEmpty(null as TestData)
                           .FirstOrDefault(a => a.Id == id);
        }

        // GET: api/sampleData
        [HttpGet]
        public List<TestData> Get()
        {
            return _context.TestData.ToList();
        }

        // POST api/sampleData
        [HttpPost]
        public TestData Post([FromBody]TestData value)
        {
            value.Id = 0;
            ICollection<ValidationResult> results = new List<ValidationResult>();
            // TODO: wrap result in response object to include http result, success/error message, validation results etc.
            if (!value.IsModelValid(out results)) return null;

            var newTestData = _context.Add(value);
            _context.SaveChanges();
            return newTestData.Entity as TestData;
        }

        // PUT api/sampleData/5
        [HttpPut]
        public TestData Put([FromBody]TestData value)
        {
            ICollection<ValidationResult> results = new List<ValidationResult>();
            // TODO: wrap result in response object to include http result, success/error message, validation results etc.
            if (!value.IsModelValid(out results)) return null;

            bool recordExists = _context.TestData.Where(a => a.Id == value.Id).Any();

            if (recordExists)
            {
                _context.Update(value);
                _context.SaveChanges();
            }

            return value;
        }

        // DELETE api/sampleData/5
        [HttpDelete("{id:int}")]
        public bool Delete(int id)
        {
            if (id > 0)
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
