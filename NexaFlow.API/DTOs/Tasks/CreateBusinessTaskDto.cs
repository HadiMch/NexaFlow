
using System.ComponentModel.DataAnnotations;

namespace NexaFlow.API.DTOs.Tasks;

public class CreateBusinessTaskDto
{
    [Required]
    [StringLength(150, MinimumLength = 1)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(2000)]
    public string? Description { get; set; }

    [Required]
    [RegularExpression("^(Low|Medium|High)$")]
    public string Priority { get; set; } = "Medium";

    [Required]
    [RegularExpression("^(To Do|In Progress|Completed)$")]
    public string Status { get; set; } = "To Do";

    public DateTime? DueDate { get; set; }
}
