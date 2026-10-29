
using System.ComponentModel.DataAnnotations;

namespace NexaFlow.API.Models;

public class CustomerActivity
{
    public int Id { get; set; }

    [Required]
    public int CustomerId { get; set; }

    [Required]
    [MaxLength(50)]
    public string Type { get; set; } = string.Empty;

    [Required]
    [MaxLength(1000)]
    public string Description { get; set; } = string.Empty;

    public DateTime? FollowUpDate { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Customer Customer { get; set; } = null!;
}
