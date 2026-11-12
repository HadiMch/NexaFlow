
using System.ComponentModel.DataAnnotations;
using NexaFlow.API.DTOs.Tasks;

namespace NexaFlow.API.Tests.Tasks;

public class BusinessTaskDtoTests
{
    [Theory]
    [InlineData("")]
    [InlineData(" ")]
    [InlineData("   ")]
    public void CreateTask_InvalidTitle_IsRejected(string title)
    {
        var dto = new CreateBusinessTaskDto
        {
            Title = title
        };

        Assert.True(
            string.IsNullOrWhiteSpace(dto.Title)
        );
    }

    [Theory]
    [InlineData("")]
    [InlineData(" ")]
    [InlineData("   ")]
    public void UpdateTask_InvalidTitle_IsRejected(string title)
    {
        var dto = new UpdateBusinessTaskDto
        {
            Title = title
        };

        Assert.True(
            string.IsNullOrWhiteSpace(dto.Title)
        );
    }

    [Theory]
    [InlineData("Invalid")]
    [InlineData("Urgent")]
    [InlineData("Critical")]
    public void CreateTask_InvalidPriority_FailsValidation(
        string priority)
    {
        var dto = new CreateBusinessTaskDto
        {
            Title = "Test Task",
            Priority = priority
        };

        Assert.False(IsValid(dto));
    }

    [Theory]
    [InlineData("Pending")]
    [InlineData("Started")]
    [InlineData("Finished")]
    public void CreateTask_InvalidStatus_FailsValidation(
        string status)
    {
        var dto = new CreateBusinessTaskDto
        {
            Title = "Test Task",
            Status = status
        };

        Assert.False(IsValid(dto));
    }

    [Fact]
    public void CreateTask_ValidDto_PassesValidation()
    {
        var dto = new CreateBusinessTaskDto
        {
            Title = "Complete NexaFlow testing",
            Priority = "High",
            Status = "In Progress"
        };

        Assert.True(IsValid(dto));
    }

    private static bool IsValid(object model)
    {
        var context = new ValidationContext(model);

        return Validator.TryValidateObject(
            model,
            context,
            new List<ValidationResult>(),
            validateAllProperties: true
        );
    }
}
