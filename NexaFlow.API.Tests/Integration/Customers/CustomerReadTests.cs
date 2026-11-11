
using System.Net;
using System.Net.Http.Json;
using NexaFlow.API.Models;
using NexaFlow.API.Tests.Integration.Infrastructure;

namespace NexaFlow.API.Tests.Integration.Customers;

public class CustomerReadTests{

    [Fact]
    public async Task GetCustomerById_ExistingCustomer_ReturnsOk(){
        using var factory = new NexaFlowWebApplicationFactory();
        using var client = factory.CreateClient();

        var customer = await CustomerTestData.CreateAsync(factory);

        try{
            var response = await client.GetAsync($"/api/customers/{customer.Id}");

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

            var result = await response.Content.ReadFromJsonAsync<Customer>();

            Assert.NotNull(result);
            Assert.Equal(customer.Id, result.Id);
            Assert.Equal(customer.Email, result.Email);
        }
        finally{
            await CustomerTestData.DeleteAsync(factory, customer.Id);
        }
    }

    [Fact]
    public async Task GetCustomerById_NonExistingCustomer_ReturnsNotFound(){
        using var factory = new NexaFlowWebApplicationFactory();
        using var client = factory.CreateClient();

        var response = await client.GetAsync("/api/customers/2147483647");

        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Theory]
    [InlineData(0, 10)]
    [InlineData(1, 0)]
    [InlineData(1, 101)]
    public async Task GetCustomers_InvalidPagination_ReturnsBadRequest(int page,int pageSize){
        using var factory = new NexaFlowWebApplicationFactory();
        using var client = factory.CreateClient();

        var response = await client.GetAsync($"/api/customers?page={page}&pageSize={pageSize}");
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }
}