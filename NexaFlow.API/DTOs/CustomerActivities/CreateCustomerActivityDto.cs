
using System.ComponentModel.DataAnnotations;

namespace NexaFlow.API.DTOs;

public class CreateCustomerActivityDto
{
    [Required]
    public int CustomerId { get; set; }

    [Required]
    [MaxLength(50)]
    public string Type { get; set; } = string.Empty;

    [Required]
    [MaxLength(1000)]
    public string Description { get; set; } = string.Empty;

    public DateTime? FollowUpDate { get; set; }
}
