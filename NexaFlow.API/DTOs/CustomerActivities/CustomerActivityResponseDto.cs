
namespace NexaFlow.API.DTOs;

public class CustomerActivityResponseDto
{
    public int Id { get; set; }

    public int CustomerId { get; set; }

    public string Type { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public DateTime? FollowUpDate { get; set; }

    public DateTime CreatedAt { get; set; }
}
