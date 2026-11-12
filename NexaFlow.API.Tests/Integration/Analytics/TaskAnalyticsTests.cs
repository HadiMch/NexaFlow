
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

        var before = await client.GetFromJsonAsync<
            AnalyticsOverviewDto>("/api/analytics/overview");

        Assert.NotNull(before);

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

            var after = await client.GetFromJsonAsync<
                AnalyticsOverviewDto>("/api/analytics/overview");

            Assert.NotNull(after);

            Assert.Equal(
                before.TotalTasks + 1,
                after.TotalTasks
            );

            Assert.Equal(
                before.OverdueTasks + 1,
                after.OverdueTasks
            );

            Assert.Equal(
                before.PendingTasks + 1,
                after.PendingTasks
            );

            Assert.Equal(
                before.TodoTasks + 1,
                after.TodoTasks
            );
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

        // Use yesterday to avoid a UTC midnight boundary.
        var testDate = DateTime.UtcNow.Date.AddDays(-1);
        var timestamp = testDate.AddHours(12);
        var dateKey = testDate.ToString("yyyy-MM-dd");

        var before = await client.GetFromJsonAsync<
            List<TaskTrendDto>>(
                "/api/analytics/task-trends?days=7"
            );

        Assert.NotNull(before);

        var beforeDay = Assert.Single(
            before,
            t => t.Date == dateKey
        );

        using var scope = factory.Services.CreateScope();
        var context = scope.ServiceProvider
            .GetRequiredService<AppDbContext>();

        var task = new BusinessTask
        {
            Title = "Completed analytics regression test",
            Priority = "Medium",
            Status = "Completed",
            CreatedAt = timestamp,
            CompletedAt = timestamp
        };

        try
        {
            context.BusinessTasks.Add(task);
            await context.SaveChangesAsync();

            var after = await client.GetFromJsonAsync<
                List<TaskTrendDto>>(
                    "/api/analytics/task-trends?days=7"
                );

            Assert.NotNull(after);

            var afterDay = Assert.Single(
                after,
                t => t.Date == dateKey
            );

            Assert.Equal(
                beforeDay.CreatedTasks + 1,
                afterDay.CreatedTasks
            );

            Assert.Equal(
                beforeDay.CompletedTasks + 1,
                afterDay.CompletedTasks
            );
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

        Assert.Equal(
            HttpStatusCode.OK,
            response.StatusCode
        );

        var stats = await response.Content
            .ReadFromJsonAsync<BusinessTaskStatsDto>();

        Assert.NotNull(stats);

        Assert.True(stats.TotalTasks >= 0);
        Assert.True(stats.OverdueTasks >= 0);
        Assert.True(stats.CompletedTasks >= 0);
    }
}
