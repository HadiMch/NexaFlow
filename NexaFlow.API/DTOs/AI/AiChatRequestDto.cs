
using System.ComponentModel.DataAnnotations;

namespace NexaFlow.API.DTOs.AI;

public class AiChatRequestDto
{
    [Required]
    [StringLength(1000, MinimumLength = 1)]
    public string Message { get; set; } = string.Empty;

    public List<ChatHistoryMessageDto> History { get; set; } = new();
}
