
namespace NexaFlow.API.DTOs.AI;

public class AiChatResponseDto
{
    public string Reply { get; set; } = string.Empty;

    public string Source { get; set; } = "NexaFlow";

    public DateTime GeneratedAt { get; set; } = DateTime.UtcNow;
}
