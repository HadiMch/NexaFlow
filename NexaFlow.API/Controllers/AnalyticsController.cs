
using Microsoft.AspNetCore.Mvc;
using NexaFlow.API.DTOs.Analytics;
using NexaFlow.API.Services;

namespace NexaFlow.API.Controllers;

/// <summary>
/// Provides business analytics and task trend reporting.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class AnalyticsController : ControllerBase{
    private readonly AnalyticsService _analyticsService;
    private readonly TaskTrendService _taskTrendService;

    public AnalyticsController(AnalyticsService analyticsService, TaskTrendService taskTrendService)
    {
        _analyticsService = analyticsService;
        _taskTrendService = taskTrendService;
    }

    /// <summary>
    /// Retrieves the business analytics overview.
    /// </summary>
    /// <remarks>
    /// Returns dashboard statistics including:
    ///
    /// - Total customers
    /// - Total products
    /// - Total inventory quantity and value
    /// - Low-stock products
    /// - Total business tasks
    /// - Task counts by status
    /// - Overdue and pending tasks
    /// - Task completion rate
    ///
    /// Inventory and task statistics are calculated
    /// using the current database records.
    /// </remarks>
    /// <returns>The business analytics overview.</returns>

    [HttpGet("overview")]
    [ProducesResponseType(typeof(AnalyticsOverviewDto), StatusCodes.Status200OK)]
    public async Task<ActionResult<AnalyticsOverviewDto>> GetOverview()
    {
        var overview = await _analyticsService.GetOverviewAsync();
        return Ok(overview);
    }

    /// <summary>
    /// Retrieves daily business task trends.
    /// </summary>
    /// <remarks>
    /// Returns the number of tasks created and completed
    /// for each day within the selected reporting period.
    ///
    /// Supported reporting periods:
    ///
    /// - 7 days
    /// - 14 days
    /// - 30 days
    ///
    /// The default reporting period is 7 days.
    ///
    /// Any other value returns HTTP 400.
    /// </remarks>
    /// <param name="days">
    /// Reporting period in days. Allowed values: 7, 14, or 30.
    /// Defaults to 7.
    /// </param>
    /// <returns>Daily task creation and completion statistics.</returns>
    
    [HttpGet("task-trends")]
    [ProducesResponseType(typeof(List<TaskTrendDto>),StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<List<TaskTrendDto>>> GetTaskTrends([FromQuery] int days = 7){
        if (days != 7 && days != 14 && days != 30){
            return BadRequest("The days parameter must be 7, 14, or 30.");
        }

        var trends = await _taskTrendService.GetTrendsAsync(days);
        return Ok(trends);
    }
}