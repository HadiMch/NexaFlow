
using System.Net;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NexaFlow.API.Data;
using NexaFlow.API.Models;
using NexaFlow.API.Tests.Integration.Infrastructure;

namespace NexaFlow.API.Tests.Integration.Products;

public class ProductDeletionTests
{
    [Fact]
    public async Task DeleteProduct_ExistingProduct_ReturnsNoContent()
    {
        using var factory = new NexaFlowWebApplicationFactory();
        using var client = factory.CreateClient();

        var product = new Product
        {
            Name = "Deletion Regression Test Product",
            SKU = $"DELETE-TEST-{Guid.NewGuid():N}",
            Quantity = 5,
            Price = 20m
        };

        int productId;

        // Insert only into the isolated test database.
        using (var scope = factory.Services.CreateScope())
        {
            var context = scope.ServiceProvider
                .GetRequiredService<AppDbContext>();

            context.Products.Add(product);
            await context.SaveChangesAsync();

            productId = product.Id;
        }

        try
        {
            // Delete the existing product through the API.
            using var response = await client.DeleteAsync(
                $"/api/products/{productId}"
            );

            Assert.Equal(
                HttpStatusCode.NoContent,
                response.StatusCode
            );

            // Verify the record is no longer accessible.
            using var getResponse = await client.GetAsync(
                $"/api/products/{productId}"
            );

            Assert.Equal(
                HttpStatusCode.NotFound,
                getResponse.StatusCode
            );

            // Verify deletion directly in the database.
            using var scope = factory.Services.CreateScope();

            var context = scope.ServiceProvider
                .GetRequiredService<AppDbContext>();

            var exists = await context.Products
                .AnyAsync(p => p.Id == productId);

            Assert.False(exists);
        }
        finally
        {
            // Cleanup if an assertion fails before deletion.
            using var scope = factory.Services.CreateScope();

            var context = scope.ServiceProvider
                .GetRequiredService<AppDbContext>();

            var remaining = await context.Products
                .FindAsync(productId);

            if (remaining != null)
            {
                context.Products.Remove(remaining);
                await context.SaveChangesAsync();
            }
        }
    }

    [Fact]
    public async Task DeleteProduct_NonExistingProduct_ReturnsNotFound()
    {
        using var factory = new NexaFlowWebApplicationFactory();
        using var client = factory.CreateClient();

        using var response = await client.DeleteAsync(
            "/api/products/2147483647"
        );

        Assert.Equal(
            HttpStatusCode.NotFound,
            response.StatusCode
        );
    }
}
