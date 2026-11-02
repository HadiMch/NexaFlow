
using Microsoft.EntityFrameworkCore;
using NexaFlow.API.Data;
using NexaFlow.API.DTOs.Analytics;

namespace NexaFlow.API.Services;

public class AnalyticsService
{
    private readonly AppDbContext _context;

    public AnalyticsService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<AnalyticsOverviewDto> GetOverviewAsync()
    {
        var now = DateTime.UtcNow;

        // Customer statistics
        var totalCustomers = await _context.Customers.CountAsync();

        // Inventory statistics
        var totalProducts = await _context.Products.CountAsync();

        var totalStockQuantity = await _context.Products
            .SumAsync(p => (long)p.Quantity);

        var totalInventoryValue = await _context.Products
            .SumAsync(p => p.Price * p.Quantity);

        var lowStockProducts = await _context.Products
            .CountAsync(p => p.Quantity <= 5);

        // Task statistics
        var totalTasks = await _context.BusinessTasks.CountAsync();

        var todoTasks = await _context.BusinessTasks
            .CountAsync(t => t.Status == "To Do");

        var inProgressTasks = await _context.BusinessTasks
            .CountAsync(t => t.Status == "In Progress");

        var completedTasks = await _context.BusinessTasks
            .CountAsync(t => t.Status == "Completed");

        var pendingTasks = await _context.BusinessTasks
            .CountAsync(t => t.Status != "Completed");

        var overdueTasks = await _context.BusinessTasks
            .CountAsync(t =>
                t.DueDate != null &&
                t.DueDate < now &&
                t.Status != "Completed");

        var completionRate = totalTasks > 0
            ? Math.Round(
                (decimal)completedTasks / totalTasks * 100,
                2)
            : 0m;

        return new AnalyticsOverviewDto
        {
            TotalCustomers = totalCustomers,
            TotalProducts = totalProducts,
            TotalStockQuantity = totalStockQuantity,
            TotalInventoryValue = totalInventoryValue,
            LowStockProducts = lowStockProducts,
            TotalTasks = totalTasks,
            TodoTasks = todoTasks,
            InProgressTasks = inProgressTasks,
            CompletedTasks = completedTasks,
            PendingTasks = pendingTasks,
            OverdueTasks = overdueTasks,
            TaskCompletionRate = completionRate
        };
    }
}
