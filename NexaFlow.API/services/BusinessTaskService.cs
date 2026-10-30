
using Microsoft.EntityFrameworkCore;
using NexaFlow.API.Data;
using NexaFlow.API.DTOs.Tasks;
using NexaFlow.API.Models;
using NexaFlow.API.Mappers;

namespace NexaFlow.API.Services;

public class BusinessTaskService
{
    private readonly AppDbContext _context;

    public BusinessTaskService(AppDbContext context)
    {
        _context = context;
    }

    // Get all tasks
    public async Task<List<BusinessTaskResponseDto>> GetAllAsync()
    {
        var tasks = await _context.BusinessTasks
            .AsNoTracking()
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();

        return tasks
            .Select(BusinessTaskMapper.ToResponseDto)
            .ToList();
    }

    // Get task by ID
    public async Task<BusinessTaskResponseDto?> GetByIdAsync(int id)
    {
        var task = await _context.BusinessTasks
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == id);

        return task == null
            ? null
            : BusinessTaskMapper.ToResponseDto(task);
    }

    // Create a task
    public async Task<BusinessTaskResponseDto> CreateAsync(
        CreateBusinessTaskDto dto)
    {
        var now = DateTime.UtcNow;

        var task = new BusinessTask
        {
            Title = dto.Title.Trim(),
            Description = dto.Description,
            Priority = dto.Priority,
            Status = dto.Status,
            DueDate = dto.DueDate,
            CreatedAt = now,
            CompletedAt = dto.Status == "Completed"
                ? now
                : null
        };

        _context.BusinessTasks.Add(task);
        await _context.SaveChangesAsync();

        return BusinessTaskMapper.ToResponseDto(task);
    }

    // Update an existing task
    public async Task<bool> UpdateAsync(
        int id,
        UpdateBusinessTaskDto dto)
    {
        var task = await _context.BusinessTasks.FindAsync(id);

        if (task == null)
            return false;

        task.Title = dto.Title.Trim();
        task.Description = dto.Description;
        task.Priority = dto.Priority;
        task.Status = dto.Status;
        task.DueDate = dto.DueDate;

        // Track task completion
        if (dto.Status == "Completed")
        {
            task.CompletedAt ??= DateTime.UtcNow;
        }
        else
        {
            task.CompletedAt = null;
        }

        await _context.SaveChangesAsync();

        return true;
    }

    // Delete a task
    public async Task<bool> DeleteAsync(int id)
    {
        var task = await _context.BusinessTasks.FindAsync(id);

        if (task == null)
            return false;

        _context.BusinessTasks.Remove(task);
        await _context.SaveChangesAsync();

        return true;
    }
}