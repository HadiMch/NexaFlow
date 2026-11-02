
using System.ComponentModel.DataAnnotations;

namespace NexaFlow.API.DTOs.AI;

public class ChatHistoryMessageDto
{
    [Required]
    public string Role { get; set; } = string.Empty;

    [Required]
    [StringLength(2000, MinimumLength = 1)]
    public string Content { get; set; } = string.Empty;
}
