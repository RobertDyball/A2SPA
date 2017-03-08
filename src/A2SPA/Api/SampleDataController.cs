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
        public IActionResult GetById(int id)
        {
            var testData = _context.TestData
                                   .DefaultIfEmpty(null as TestData)
                                   .FirstOrDefault(a => a.Id == id);

            if (testData == null)
            {
                return NoContent();
            }

            return Ok(testData);
        }

        // GET: api/sampleData
        [HttpGet]
        public IActionResult Get()
        {
            var testData = _context.TestData;

            if (!testData.Any())
            {
                return NoContent();
            }

            return Ok(testData.ToList());
        }

        // POST api/sampleData
        [HttpPost]
        public IActionResult Post([FromBody]TestData value)
        {
            value.Id = 0;
            ICollection<ValidationResult> results = new List<ValidationResult>();

            if (!value.IsModelValid(out results))
            {
                return BadRequest(results);
            }

            var newTestData = _context.Add(value);
            _context.SaveChanges();

            return Ok(newTestData.Entity as TestData);
        }

        // PUT api/sampleData/5
        [HttpPut]
        public IActionResult Put([FromBody]TestData value)
        {
            ICollection<ValidationResult> results = new List<ValidationResult>();

            if (!value.IsModelValid(out results))
            {
                return BadRequest(results);
            }

            bool recordExists = _context.TestData.Where(a => a.Id == value.Id).Any();

            if (recordExists)
            {
                _context.Update(value);
                _context.SaveChanges();
                return Ok(value);
            }

            return NoContent();
        }

        // DELETE api/sampleData/5
        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
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
                    return Json(Ok("deleted"));
                }
            }

            return Json(NotFound("Record not found; not deleted"));
        }
    }
}
