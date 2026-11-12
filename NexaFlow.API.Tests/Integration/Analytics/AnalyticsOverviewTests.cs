
using System.Net;
using System.Net.Http.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NexaFlow.API.Data;
using NexaFlow.API.DTOs.Analytics;
using NexaFlow.API.Models;
using NexaFlow.API.Tests.Integration.Infrastructure;

namespace NexaFlow.API.Tests.Integration.Analytics;

public class AnalyticsOverviewTests
{
    [Fact]
    public async Task Overview_ReturnsSuccessfulResponse()
    {
        using var factory = new NexaFlowWebApplicationFactory();
        using var client = factory.CreateClient();

        using var response = await client.GetAsync(
            "/api/analytics/overview");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var overview = await response.Content
            .ReadFromJsonAsync<AnalyticsOverviewDto>();

        Assert.NotNull(overview);
        Assert.True(overview.TotalCustomers >= 0);
        Assert.True(overview.TotalProducts >= 0);
        Assert.True(overview.TotalTasks >= 0);
    }

    [Fact]
    public async Task Overview_CalculatesCompletionRateCorrectly()
    {
        using var factory = new NexaFlowWebApplicationFactory();
        using var client = factory.CreateClient();

        var overview = await client.GetFromJsonAsync<
            AnalyticsOverviewDto>("/api/analytics/overview");

        Assert.NotNull(overview);

        var expectedRate = overview.TotalTasks == 0
            ? 0m
            : Math.Round(
                (decimal)overview.CompletedTasks /
                overview.TotalTasks * 100,
                2
            );

        Assert.Equal(
            expectedRate,
            overview.TaskCompletionRate
        );
    }

    [Fact]
    public async Task Overview_CalculatesInventoryTotalsCorrectly()
    {
        using var factory = new NexaFlowWebApplicationFactory();
        using var client = factory.CreateClient();

        using var scope = factory.Services.CreateScope();
        var context = scope.ServiceProvider
            .GetRequiredService<AppDbContext>();

        var expectedQuantity = await context.Products
            .SumAsync(p => (long)p.Quantity);

        var expectedValue = await context.Products
            .SumAsync(p => p.Price * p.Quantity);

        var overview = await client.GetFromJsonAsync<
            AnalyticsOverviewDto>("/api/analytics/overview");

        Assert.NotNull(overview);

        Assert.Equal(
            expectedQuantity,
            overview.TotalStockQuantity
        );

        Assert.Equal(
            expectedValue,
            overview.TotalInventoryValue
        );
    }

    [Fact]
    public async Task Overview_NewProduct_IncreasesInventoryTotals()
    {
        using var factory = new NexaFlowWebApplicationFactory();
        using var client = factory.CreateClient();

        var product = new Product
        {
            Name = "Analytics Test Product",
            SKU = $"ANALYTICS-{Guid.NewGuid():N}",
            Quantity = 4,
            Price = 25m
        };

        using var scope = factory.Services.CreateScope();
        var context = scope.ServiceProvider
            .GetRequiredService<AppDbContext>();

        context.Products.Add(product);
        await context.SaveChangesAsync();

        try
        {
            var overview = await client.GetFromJsonAsync<
                AnalyticsOverviewDto>("/api/analytics/overview");

            Assert.NotNull(overview);
            Assert.True(overview.TotalProducts >= 1);
            Assert.True(overview.TotalStockQuantity >= 4);
            Assert.True(overview.TotalInventoryValue >= 100m);
        }
        finally
        {
            context.Products.Remove(product);
            await context.SaveChangesAsync();
        }
    }
}
