
using System.Net;
using System.Net.Http.Json;
using NexaFlow.API.DTOs.Tasks;
using NexaFlow.API.Tests.Integration.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NexaFlow.API.Data;

namespace NexaFlow.API.Tests.Integration.Tasks;

public class BusinessTaskLifecycleTests
{
    [Fact]
    public async Task CreateTask_ValidRequest_ReturnsCreated()
    {
        using var factory = new NexaFlowWebApplicationFactory();
        using var client = factory.CreateClient();

        int? taskId = null;

        try
        {
            var dto = new CreateBusinessTaskDto
            {
                Title = "Integration test task",
                Description = "Testing task creation",
                Priority = "High",
                Status = "To Do"
            };

            using var response = await client.PostAsJsonAsync(
                "/api/businesstasks",
                dto
            );

            Assert.Equal(HttpStatusCode.Created, response.StatusCode);

            var created = await response.Content
                .ReadFromJsonAsync<BusinessTaskResponseDto>();

            Assert.NotNull(created);

            taskId = created.Id;

            Assert.True(created.Id > 0);
            Assert.Equal(dto.Title, created.Title);
            Assert.Equal(dto.Priority, created.Priority);
            Assert.Equal(dto.Status, created.Status);
            Assert.Null(created.CompletedAt);
        }
        finally
        {
            if (taskId.HasValue)
            {
                using var scope = factory.Services.CreateScope();
                var context = scope.ServiceProvider
                    .GetRequiredService<AppDbContext>();

                var task = await context.BusinessTasks
                    .FindAsync(taskId.Value);

                if (task != null)
                {
                    context.BusinessTasks.Remove(task);
                    await context.SaveChangesAsync();
                }
            }
        }
    }

    [Fact]
    public async Task UpdateTask_ToCompleted_SetsCompletedAt()
    {
        using var factory = new NexaFlowWebApplicationFactory();
        using var client = factory.CreateClient();

        int? taskId = null;

        try
        {
            var createDto = new CreateBusinessTaskDto
            {
                Title = "Task to complete",
                Priority = "Medium",
                Status = "To Do"
            };

            using var createResponse = await client.PostAsJsonAsync(
                "/api/businesstasks",
                createDto
            );

            createResponse.EnsureSuccessStatusCode();

            var created = await createResponse.Content
                .ReadFromJsonAsync<BusinessTaskResponseDto>();

            Assert.NotNull(created);

            taskId = created.Id;

            var updateDto = new UpdateBusinessTaskDto
            {
                Title = created.Title,
                Priority = created.Priority,
                Status = "Completed"
            };

            using var updateResponse = await client.PutAsJsonAsync(
                $"/api/businesstasks/{taskId}",
                updateDto
            );

            Assert.Equal(
                HttpStatusCode.NoContent,
                updateResponse.StatusCode
            );

            var updated = await client.GetFromJsonAsync<
                BusinessTaskResponseDto>(
                $"/api/businesstasks/{taskId}"
            );

            Assert.NotNull(updated);
            Assert.Equal("Completed", updated.Status);
            Assert.NotNull(updated.CompletedAt);
        }
        finally
        {
            if (taskId.HasValue)
            {
                using var scope = factory.Services.CreateScope();
                var context = scope.ServiceProvider
                    .GetRequiredService<AppDbContext>();

                var task = await context.BusinessTasks
                    .FindAsync(taskId.Value);

                if (task != null)
                {
                    context.BusinessTasks.Remove(task);
                    await context.SaveChangesAsync();
                }
            }
        }
    }

    [Fact]
    public async Task DeleteTask_ExistingTask_ReturnsNoContent()
    {
        using var factory = new NexaFlowWebApplicationFactory();
        using var client = factory.CreateClient();

        var createDto = new CreateBusinessTaskDto
        {
            Title = "Task to delete",
            Priority = "Low",
            Status = "To Do"
        };

        using var createResponse = await client.PostAsJsonAsync(
            "/api/businesstasks",
            createDto
        );

        createResponse.EnsureSuccessStatusCode();

        var created = await createResponse.Content
            .ReadFromJsonAsync<BusinessTaskResponseDto>();

        Assert.NotNull(created);

        using var deleteResponse = await client.DeleteAsync(
            $"/api/businesstasks/{created.Id}"
        );

        Assert.Equal(
            HttpStatusCode.NoContent,
            deleteResponse.StatusCode
        );

        using var getResponse = await client.GetAsync(
            $"/api/businesstasks/{created.Id}"
        );

        Assert.Equal(
            HttpStatusCode.NotFound,
            getResponse.StatusCode
        );
    }
}
