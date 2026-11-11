
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NexaFlow.API.Data;
using NexaFlow.API.DTOs;
using NexaFlow.API.Models;

namespace NexaFlow.API.Tests.Integration.Infrastructure;

public static class CustomerTestData{
    public static CreateCustomerDto CreateValidDto(){
        return new CreateCustomerDto
        {
            Name = "Integration Test Customer",
            Email = $"test-{Guid.NewGuid():N}@example.com",
            Phone = "70123456"
        };
    }

    public static async Task<Customer> CreateAsync(NexaFlowWebApplicationFactory factory)
    {
        using var scope = factory.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var customer = new Customer
        {
            Name = "Integration Test Customer",
            Email = $"test-{Guid.NewGuid():N}@example.com",
            Phone = "70123456"
        };

        context.Customers.Add(customer);
        await context.SaveChangesAsync();
        return customer;
    }
    
    public static async Task DeleteAsync(NexaFlowWebApplicationFactory factory,int customerId){
        using var scope = factory.Services.CreateScope();

        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var customer = await context.Customers.FirstOrDefaultAsync(c => c.Id == customerId);

        if (customer is null)
            return;

        context.Customers.Remove(customer);
        await context.SaveChangesAsync();
    }
}