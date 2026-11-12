
using System.Net;
using System.Net.Http.Json;
using NexaFlow.API.DTOs.Tasks;
using NexaFlow.API.Tests.Integration.Infrastructure;

namespace NexaFlow.API.Tests.Integration.Tasks;

public class BusinessTaskValidationTests
{
    [Theory]
    [InlineData("")]
    [InlineData(" ")]
    [InlineData("   ")]
    public async Task CreateTask_WhitespaceTitle_ReturnsBadRequest(
        string title)
    {
        using var factory = new NexaFlowWebApplicationFactory();
        using var client = factory.CreateClient();

        var dto = new CreateBusinessTaskDto
        {
            Title = title,
            Priority = "Medium",
            Status = "To Do"
        };

        using var response = await client.PostAsJsonAsync(
            "/api/businesstasks",
            dto
        );

        Assert.Equal(
            HttpStatusCode.BadRequest,
            response.StatusCode
        );
    }

    [Fact]
    public async Task CreateTask_InvalidPriority_ReturnsBadRequest()
    {
        using var factory = new NexaFlowWebApplicationFactory();
        using var client = factory.CreateClient();

        var dto = new CreateBusinessTaskDto
        {
            Title = "Test Task",
            Priority = "Critical",
            Status = "To Do"
        };

        using var response = await client.PostAsJsonAsync(
            "/api/businesstasks",
            dto
        );

        Assert.Equal(
            HttpStatusCode.BadRequest,
            response.StatusCode
        );
    }

    [Fact]
    public async Task CreateTask_InvalidStatus_ReturnsBadRequest()
    {
        using var factory = new NexaFlowWebApplicationFactory();
        using var client = factory.CreateClient();

        var dto = new CreateBusinessTaskDto
        {
            Title = "Test Task",
            Priority = "High",
            Status = "Finished"
        };

        using var response = await client.PostAsJsonAsync(
            "/api/businesstasks",
            dto
        );

        Assert.Equal(
            HttpStatusCode.BadRequest,
            response.StatusCode
        );
    }

    [Fact]
    public async Task UpdateTask_InvalidTitle_ReturnsBadRequest()
    {
        using var factory = new NexaFlowWebApplicationFactory();
        using var client = factory.CreateClient();

        var dto = new UpdateBusinessTaskDto
        {
            Title = "   ",
            Priority = "Medium",
            Status = "To Do"
        };

        using var response = await client.PutAsJsonAsync(
            "/api/businesstasks/2147483647",
            dto
        );

        Assert.Equal(
            HttpStatusCode.BadRequest,
            response.StatusCode
        );
    }
}
