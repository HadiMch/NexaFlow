
using Microsoft.AspNetCore.Mvc;
using NexaFlow.API.DTOs.Analytics;
using NexaFlow.API.Services;

namespace NexaFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AnalyticsController : ControllerBase
{
    private readonly AnalyticsService _analyticsService;
    private readonly TaskTrendService _taskTrendService;

    public AnalyticsController(
        AnalyticsService analyticsService,
        TaskTrendService taskTrendService)
    {
        _analyticsService = analyticsService;
        _taskTrendService = taskTrendService;
    }

    // GET: api/Analytics/overview
    [HttpGet("overview")]
    public async Task<ActionResult<AnalyticsOverviewDto>> GetOverview()
    {
        var overview = await _analyticsService.GetOverviewAsync();

        return Ok(overview);
    }

    // GET: api/Analytics/task-trends?days=7
    [HttpGet("task-trends")]
    public async Task<ActionResult<List<TaskTrendDto>>> GetTaskTrends(
        [FromQuery] int days = 7)
    {
        if (days != 7 && days != 14 && days != 30)
        {
            return BadRequest(
                "The days parameter must be 7, 14, or 30.");
        }

        var trends = await _taskTrendService.GetTrendsAsync(days);

        return Ok(trends);
    }
}
