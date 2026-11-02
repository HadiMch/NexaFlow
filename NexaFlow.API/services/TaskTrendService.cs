
using Microsoft.EntityFrameworkCore;
using NexaFlow.API.Data;
using NexaFlow.API.DTOs.Analytics;

namespace NexaFlow.API.Services;

public class TaskTrendService
{
    private readonly AppDbContext _context;

    public TaskTrendService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<TaskTrendDto>> GetTrendsAsync(int days)
    {
        var endDate = DateTime.UtcNow.Date;
        var startDate = endDate.AddDays(-(days - 1));
        var exclusiveEnd = endDate.AddDays(1);

        // Fetch creation dates within the selected period
        var createdDates = await _context.BusinessTasks
            .AsNoTracking()
            .Where(t =>
                t.CreatedAt >= startDate &&
                t.CreatedAt < exclusiveEnd)
            .Select(t => t.CreatedAt)
            .ToListAsync();

        // Fetch completion dates within the selected period
        var completedDates = await _context.BusinessTasks
            .AsNoTracking()
            .Where(t =>
                t.CompletedAt.HasValue &&
                t.CompletedAt.Value >= startDate &&
                t.CompletedAt.Value < exclusiveEnd)
            .Select(t => t.CompletedAt!.Value)
            .ToListAsync();

        var createdCounts = createdDates
            .GroupBy(date => date.Date)
            .ToDictionary(group => group.Key, group => group.Count());

        var completedCounts = completedDates
            .GroupBy(date => date.Date)
            .ToDictionary(group => group.Key, group => group.Count());

        var trends = new List<TaskTrendDto>();

        for (var i = 0; i < days; i++)
        {
            var date = startDate.AddDays(i);

            trends.Add(new TaskTrendDto
            {
                Date = date.ToString("yyyy-MM-dd"),
                CreatedTasks = createdCounts.GetValueOrDefault(date),
                CompletedTasks = completedCounts.GetValueOrDefault(date)
            });
        }

        return trends;
    }
}
