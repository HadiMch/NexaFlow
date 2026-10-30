
namespace NexaFlow.API.DTOs.Tasks;

public class BusinessTaskStatsDto{
    public int TotalTasks { get; set; }
    public int TodoTasks { get; set; }
    public int InProgressTasks { get; set; }
    public int CompletedTasks { get; set; }
    public int OverdueTasks { get; set; }
}