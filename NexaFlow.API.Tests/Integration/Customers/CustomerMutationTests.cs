
using System.Net;
using System.Net.Http.Json;
using NexaFlow.API.DTOs;
using NexaFlow.API.Models;
using NexaFlow.API.Tests.Integration.Infrastructure;

namespace NexaFlow.API.Tests.Integration.Customers;

public class CustomerMutationTests{

    [Fact]
    public async Task UpdateCustomer_ExistingCustomer_ReturnsNoContent(){
        using var factory = new NexaFlowWebApplicationFactory();
        using var client = factory.CreateClient();
        var customer = await CustomerTestData.CreateAsync(factory);

        try
        {
            var dto = new UpdateCustomerDto{
                Name = "Updated Customer",
                Email = "updated@example.com",
                Phone = "76999999"
            };

            var response = await client.PutAsJsonAsync($"/api/customers/{customer.Id}", dto);
            Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);

            var updated = await client.GetFromJsonAsync<Customer>($"/api/customers/{customer.Id}");

            Assert.NotNull(updated);
            Assert.Equal(dto.Name, updated.Name);
            Assert.Equal(dto.Email, updated.Email);
        }
        finally{
            await CustomerTestData.DeleteAsync(factory, customer.Id);
        }
    }

    [Fact]
    public async Task UpdateCustomer_NonExistingCustomer_ReturnsNotFound(){
        using var factory = new NexaFlowWebApplicationFactory();
        using var client = factory.CreateClient();

        var dto = new UpdateCustomerDto{
            Name = "Unknown Customer",
            Email = "unknown@example.com"
        };

        var response = await client.PutAsJsonAsync("/api/customers/2147483647", dto);
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task DeleteCustomer_ExistingCustomer_ReturnsNoContent(){
        using var factory = new NexaFlowWebApplicationFactory();
        using var client = factory.CreateClient();

        var customer = await CustomerTestData.CreateAsync(factory);

        try{
            var response = await client.DeleteAsync($"/api/customers/{customer.Id}");
            Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);

            var getResponse = await client.GetAsync($"/api/customers/{customer.Id}");
            Assert.Equal(HttpStatusCode.NotFound, getResponse.StatusCode);
        }
        finally{
            await CustomerTestData.DeleteAsync(factory, customer.Id);
        }
    }

    [Fact]
    public async Task DeleteCustomer_NonExistingCustomer_ReturnsNotFound(){
        using var factory = new NexaFlowWebApplicationFactory();
        using var client = factory.CreateClient();
        var response = await client.DeleteAsync("/api/customers/2147483647");
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }
}