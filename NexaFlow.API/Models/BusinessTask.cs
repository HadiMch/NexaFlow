
using System.ComponentModel.DataAnnotations;

namespace NexaFlow.API.Models;

public class BusinessTask
{
    public int Id { get; set; }

    [Required]
    [MaxLength(150)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(2000)]
    public string? Description { get; set; }

    [Required]
    [MaxLength(20)]
    public string Priority { get; set; } = "Medium";

    [Required]
    [MaxLength(30)]
    public string Status { get; set; } = "To Do";

    public DateTime? DueDate { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? CompletedAt { get; set; }
}