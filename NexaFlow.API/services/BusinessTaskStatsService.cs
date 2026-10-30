
using Microsoft.EntityFrameworkCore;
using NexaFlow.API.Data;
using NexaFlow.API.DTOs.Tasks;

namespace NexaFlow.API.Services;

public class BusinessTaskStatsService
{
    private readonly AppDbContext _context;

    public BusinessTaskStatsService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<BusinessTaskStatsDto> GetStatsAsync()
    {
        var now = DateTime.UtcNow;

        return new BusinessTaskStatsDto
        {
            TotalTasks = await _context.BusinessTasks.CountAsync(),

            TodoTasks = await _context.BusinessTasks
                .CountAsync(t => t.Status == "To Do"),

            InProgressTasks = await _context.BusinessTasks
                .CountAsync(t => t.Status == "In Progress"),

            CompletedTasks = await _context.BusinessTasks
                .CountAsync(t => t.Status == "Completed"),

            OverdueTasks = await _context.BusinessTasks
                .CountAsync(t =>
                    t.DueDate != null &&
                    t.DueDate < now &&
                    t.Status != "Completed")
        };
    }
}
