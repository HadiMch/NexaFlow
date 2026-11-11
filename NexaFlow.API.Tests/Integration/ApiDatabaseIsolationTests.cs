
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NexaFlow.API.Data;
using NexaFlow.API.Tests.Integration.Infrastructure;
namespace NexaFlow.API.Tests.Integration;

public class ApiDatabaseIsolationTests{
    [Fact]
    public async Task ApiDbContext_ShouldUseTestDatabase(){
        using var factory = new NexaFlowWebApplicationFactory();
        using var client = factory.CreateClient();
        using var scope = factory.Services.CreateScope();

        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var databaseName = context.Database.GetDbConnection().Database;

        Assert.Equal("nexaflow_test_db",databaseName);
        Assert.Equal("Npgsql.EntityFrameworkCore.PostgreSQL",context.Database.ProviderName);

        var actualDatabase = await context.Database.SqlQueryRaw<string>(
                "SELECT current_database() AS \"Value\""
            )
            .SingleAsync();

        Assert.Equal("nexaflow_test_db", actualDatabase);
    }
}