
using NexaFlow.API.DTOs.Tasks;
using NexaFlow.API.Models;

namespace NexaFlow.API.Mappers;

public static class BusinessTaskMapper
{
    public static BusinessTaskResponseDto ToResponseDto(
        BusinessTask task)
    {
        return new BusinessTaskResponseDto
        {
            Id = task.Id,
            Title = task.Title,
            Description = task.Description,
            Priority = task.Priority,
            Status = task.Status,
            DueDate = task.DueDate,
            CreatedAt = task.CreatedAt,
            CompletedAt = task.CompletedAt
        };
    }
}