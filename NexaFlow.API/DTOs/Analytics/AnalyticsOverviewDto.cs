
namespace NexaFlow.API.DTOs.Analytics;

public class AnalyticsOverviewDto
{
    // Customers
    public int TotalCustomers { get; set; }

    // Inventory
    public int TotalProducts { get; set; }
    public long TotalStockQuantity { get; set; }
    public decimal TotalInventoryValue { get; set; }
    public int LowStockProducts { get; set; }

    // Tasks
    public int TotalTasks { get; set; }
    public int TodoTasks { get; set; }
    public int InProgressTasks { get; set; }
    public int CompletedTasks { get; set; }
    public int PendingTasks { get; set; }
    public int OverdueTasks { get; set; }

    // Performance
    public decimal TaskCompletionRate { get; set; }
}
