
using Microsoft.EntityFrameworkCore;
using NexaFlow.API.Data;
using NexaFlow.API.DTOs;
using NexaFlow.API.Models;

namespace NexaFlow.API.Services;

public class CustomerActivityService
{
    private readonly AppDbContext _context;

    public CustomerActivityService(AppDbContext context)
    {
        _context = context;
    }


    
    public async Task<List<CustomerActivityResponseDto>> GetAllAsync(int customerId){
        return await _context.CustomerActivities
        .AsNoTracking()
        .Where(a => a.CustomerId == customerId)
        .OrderByDescending(a => a.CreatedAt)
        .Select(a => new CustomerActivityResponseDto
        {
            Id = a.Id,
            CustomerId = a.CustomerId,
            Type = a.Type,
            Description = a.Description,
            FollowUpDate = a.FollowUpDate,
            CreatedAt = a.CreatedAt
        })
        .ToListAsync();
    }



    
    public async Task<CustomerActivityResponseDto?> GetByIdAsync(int id){
        return await _context.CustomerActivities
        .AsNoTracking()
        .Where(a => a.Id == id)
        .Select(a => new CustomerActivityResponseDto
        {
            Id = a.Id,
            CustomerId = a.CustomerId,
            Type = a.Type,
            Description = a.Description,
            FollowUpDate = a.FollowUpDate,
            CreatedAt = a.CreatedAt
        })
        .FirstOrDefaultAsync();
    }


    
    public async Task<CustomerActivityResponseDto?> CreateAsync(CreateCustomerActivityDto dto){
    bool customerExists = await _context.Customers.AnyAsync(c => c.Id == dto.CustomerId);

    if (!customerExists)
        return null;

    var activity = new CustomerActivity
    {
        CustomerId = dto.CustomerId,
        Type = dto.Type,
        Description = dto.Description,
        FollowUpDate = dto.FollowUpDate,
        CreatedAt = DateTime.UtcNow
    };

    _context.CustomerActivities.Add(activity);
    await _context.SaveChangesAsync();

    return new CustomerActivityResponseDto
    {
        Id = activity.Id,
        CustomerId = activity.CustomerId,
        Type = activity.Type,
        Description = activity.Description,
        FollowUpDate = activity.FollowUpDate,
        CreatedAt = activity.CreatedAt
    };
    }



    public async Task<bool> UpdateAsync(int id,UpdateCustomerActivityDto dto){
        var activity = await _context.CustomerActivities.FindAsync(id);

        if (activity == null)
            return false;

        activity.Type = dto.Type;
        activity.Description = dto.Description;
        activity.FollowUpDate = dto.FollowUpDate;

        await _context.SaveChangesAsync();

        return true;
    }


    public async Task<bool> DeleteAsync(int id){
        var activity = await _context.CustomerActivities.FindAsync(id);

        if (activity == null)
            return false;

        _context.CustomerActivities.Remove(activity);
        await _context.SaveChangesAsync();

        return true;
    }
}