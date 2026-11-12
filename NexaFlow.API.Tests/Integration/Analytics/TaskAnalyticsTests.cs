
using System.Net;
using System.Net.Http.Json;
using Microsoft.Extensions.DependencyInjection;
using NexaFlow.API.Data;
using NexaFlow.API.DTOs.Analytics;
using NexaFlow.API.DTOs.Tasks;
using NexaFlow.API.Models;
using NexaFlow.API.Tests.Integration.Infrastructure;

namespace NexaFlow.API.Tests.Integration.Analytics;

public class TaskAnalyticsTests
{
    [Fact]
    public async Task Overview_OverdueTask_IsCounted()
    {
        using var factory = new NexaFlowWebApplicationFactory();
        using var client = factory.CreateClient();

        using var scope = factory.Services.CreateScope();
        var context = scope.ServiceProvider
            .GetRequiredService<AppDbContext>();

        var task = new BusinessTask
        {
            Title = "Overdue analytics regression test",
            Priority = "High",
            Status = "To Do",
            CreatedAt = DateTime.UtcNow,
            DueDate = DateTime.UtcNow.AddDays(-2)
        };

        try
        {
            context.BusinessTasks.Add(task);
            await context.SaveChangesAsync();

            var overview = await client.GetFromJsonAsync<
                AnalyticsOverviewDto>("/api/analytics/overview");

            Assert.NotNull(overview);
            Assert.True(overview.OverdueTasks >= 1);
            Assert.True(overview.PendingTasks >= 1);
        }
        finally
        {
            if (task.Id > 0)
            {
                context.BusinessTasks.Remove(task);
                await context.SaveChangesAsync();
            }
        }
    }

    [Fact]
    public async Task TaskTrends_CompletedTask_IsCounted()
    {
        using var factory = new NexaFlowWebApplicationFactory();
        using var client = factory.CreateClient();

        using var scope = factory.Services.CreateScope();
        var context = scope.ServiceProvider
            .GetRequiredService<AppDbContext>();

        var now = DateTime.UtcNow;

        var task = new BusinessTask
        {
            Title = "Completed analytics regression test",
            Priority = "Medium",
            Status = "Completed",
            CreatedAt = now,
            CompletedAt = now
        };

        try
        {
            context.BusinessTasks.Add(task);
            await context.SaveChangesAsync();

            var trends = await client.GetFromJsonAsync<
                List<TaskTrendDto>>(
                "/api/analytics/task-trends?days=7"
            );

            Assert.NotNull(trends);

            var today = now.ToString("yyyy-MM-dd");

            var todayTrend = Assert.Single(
                trends,
                t => t.Date == today
            );

            Assert.True(todayTrend.CreatedTasks >= 1);
            Assert.True(todayTrend.CompletedTasks >= 1);
        }
        finally
        {
            if (task.Id > 0)
            {
                context.BusinessTasks.Remove(task);
                await context.SaveChangesAsync();
            }
        }
    }

    [Fact]
    public async Task TaskStats_ReturnsValidStatistics()
    {
        using var factory = new NexaFlowWebApplicationFactory();
        using var client = factory.CreateClient();

        using var response = await client.GetAsync(
            "/api/businesstasks/stats"
        );

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var stats = await response.Content
            .ReadFromJsonAsync<BusinessTaskStatsDto>();

        Assert.NotNull(stats);
        Assert.True(stats.TotalTasks >= 0);
        Assert.True(stats.OverdueTasks >= 0);
        Assert.True(stats.CompletedTasks >= 0);
    }
}
