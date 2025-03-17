using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AsyncDataAPI.Controllers
{
    [Route("api/posts")]
    [ApiController]
    public class PostController : ControllerBase
    {
        // Sample data for testing pagination
        private static readonly List<string> SampleData = Enumerable.Range(1, 100)
            .Select(i => $"Post {i} - Title and Content").ToList();

        [HttpGet]
        public async Task<IActionResult> GetPosts([FromQuery] int page = 1, [FromQuery] int pageSize = 5)
        {
            if (page < 1 || pageSize < 1)
                return BadRequest("Page and PageSize must be greater than 0");
            int totalRecords = SampleData.Count;
            int totalPages = (int)Math.Ceiling(totalRecords / (double)pageSize);

            var paginatedData = SampleData.Skip((page - 1) * pageSize).Take(pageSize).ToList();

            // Simulate async operation
            await Task.Delay(500);

            return Ok(new
            {
                data = paginatedData,
                currentPage = page,
                totalPages = totalPages,
                pageSize = pageSize,
                totalRecords = totalRecords
            });
        }
    }
}