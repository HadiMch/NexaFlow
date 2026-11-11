
using System.Net;
using System.Net.Http.Json;
using NexaFlow.API.Models;
using NexaFlow.API.Tests.Integration.Infrastructure;

namespace NexaFlow.API.Tests.Integration.Customers;

public class CustomerCreateTests{

    [Fact]
    public async Task CreateCustomer_ValidData_ReturnsCreated(){
        using var factory = new NexaFlowWebApplicationFactory();
        using var client = factory.CreateClient();

        var dto = CustomerTestData.CreateValidDto();
        int? createdId = null;

        try{
            var response = await client.PostAsJsonAsync("/api/customers", dto);
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);

            var customer = await response.Content.ReadFromJsonAsync<Customer>();

            Assert.NotNull(customer);
            createdId = customer.Id;

            Assert.Equal(dto.Name, customer.Name);
            Assert.Equal(dto.Email, customer.Email);
            Assert.Equal(dto.Phone, customer.Phone);
            Assert.True(customer.Id > 0);
        }
        finally{
            if (createdId.HasValue)
                await CustomerTestData.DeleteAsync(factory, createdId.Value);
        }
    }

    [Fact]
    public async Task CreateCustomer_InvalidEmail_ReturnsBadRequest(){
        using var factory = new NexaFlowWebApplicationFactory();
        using var client = factory.CreateClient();

        var dto = CustomerTestData.CreateValidDto();
        dto.Email = "invalid-email";

        var response = await client.PostAsJsonAsync("/api/customers", dto);
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task CreateCustomer_EmptyName_ReturnsBadRequest(){
        using var factory = new NexaFlowWebApplicationFactory();
        using var client = factory.CreateClient();

        var dto = CustomerTestData.CreateValidDto();
        dto.Name = "";

        var response = await client.PostAsJsonAsync("/api/customers", dto);
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }
}