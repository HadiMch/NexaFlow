
using System.Net;
using System.Net.Http.Json;
using NexaFlow.API.DTOs;
using NexaFlow.API.Tests.Integration.Infrastructure;

namespace NexaFlow.API.Tests.Integration.CustomerActivities;

public class CustomerActivityMutationTests
{
    [Fact]
    public async Task UpdateActivity_NonExistingActivity_ReturnsNotFound()
    {
        using var factory = new NexaFlowWebApplicationFactory();
        using var client = factory.CreateClient();

        var dto = new UpdateCustomerActivityDto
        {
            Type = "Call",
            Description = "Attempt to update a nonexistent activity",
            FollowUpDate = null
        };

        var response = await client.PutAsJsonAsync(
            "/api/customeractivities/2147483647",
            dto
        );

        Assert.Equal(
            HttpStatusCode.NotFound,
            response.StatusCode
        );
    }

    [Fact]
    public async Task DeleteActivity_NonExistingActivity_ReturnsNotFound()
    {
        using var factory = new NexaFlowWebApplicationFactory();
        using var client = factory.CreateClient();

        var response = await client.DeleteAsync(
            "/api/customeractivities/2147483647"
        );

        Assert.Equal(
            HttpStatusCode.NotFound,
            response.StatusCode
        );
    }

    [Fact]
    public async Task GetActivity_NonExistingActivity_ReturnsNotFound()
    {
        using var factory = new NexaFlowWebApplicationFactory();
        using var client = factory.CreateClient();

        var response = await client.GetAsync(
            "/api/customeractivities/2147483647"
        );

        Assert.Equal(
            HttpStatusCode.NotFound,
            response.StatusCode
        );
    }
}
