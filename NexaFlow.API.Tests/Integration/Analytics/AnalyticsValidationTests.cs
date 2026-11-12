
using System.Net;
using System.Net.Http.Json;
using NexaFlow.API.DTOs.Analytics;
using NexaFlow.API.Tests.Integration.Infrastructure;

namespace NexaFlow.API.Tests.Integration.Analytics;

public class AnalyticsValidationTests
{
    [Theory]
    [InlineData(0)]
    [InlineData(1)]
    [InlineData(5)]
    [InlineData(15)]
    [InlineData(31)]
    [InlineData(-7)]
    public async Task TaskTrends_InvalidDays_ReturnsBadRequest(
        int days)
    {
        using var factory = new NexaFlowWebApplicationFactory();
        using var client = factory.CreateClient();

        using var response = await client.GetAsync(
            $"/api/analytics/task-trends?days={days}"
        );

        Assert.Equal(
            HttpStatusCode.BadRequest,
            response.StatusCode
        );
    }

    [Theory]
    [InlineData(7)]
    [InlineData(14)]
    [InlineData(30)]
    public async Task TaskTrends_ValidDays_ReturnsExpectedCount(
        int days)
    {
        using var factory = new NexaFlowWebApplicationFactory();
        using var client = factory.CreateClient();

        using var response = await client.GetAsync(
            $"/api/analytics/task-trends?days={days}"
        );

        Assert.Equal(
            HttpStatusCode.OK,
            response.StatusCode
        );

        var trends = await response.Content
            .ReadFromJsonAsync<List<TaskTrendDto>>();

        Assert.NotNull(trends);
        Assert.Equal(days, trends.Count);
    }

    [Fact]
    public async Task TaskTrends_DefaultDays_ReturnsSevenDays()
    {
        using var factory = new NexaFlowWebApplicationFactory();
        using var client = factory.CreateClient();

        var trends = await client.GetFromJsonAsync<
            List<TaskTrendDto>>(
            "/api/analytics/task-trends"
        );

        Assert.NotNull(trends);
        Assert.Equal(7, trends.Count);
    }
}
