using Microsoft.AspNetCore.Mvc;
using A2SPA.ViewModels;

namespace A2SPA.Api
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        // GET: api/values
        [HttpGet]
        public TestData Get()
        {
            var testData = new TestData
            {
                Username = "BillBloggs",
                EmailAddress = "bill.bloggs@example.com",
                Password = "P@55word",
                Currency = 123.45M
            };

            return testData;
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
