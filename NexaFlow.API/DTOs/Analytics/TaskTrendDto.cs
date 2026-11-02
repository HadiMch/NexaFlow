
namespace NexaFlow.API.DTOs.Analytics;

public class TaskTrendDto
{
    public string Date { get; set; } = string.Empty;

    public int CreatedTasks { get; set; }

    public int CompletedTasks { get; set; }
}
