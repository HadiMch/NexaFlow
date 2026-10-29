
namespace NexaFlow.API.DTOs;

public class InventoryStatsDto
{
    public int TotalProducts { get; set; }

    public long TotalStockQuantity { get; set; }

    public int LowStockProducts { get; set; }

    public decimal TotalInventoryValue { get; set; }
}
