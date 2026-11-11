
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NexaFlow.API.Data;
using NexaFlow.API.Tests.Helpers;
using NexaFlow.API.Tests.Integration.Infrastructure;
using Npgsql;

namespace NexaFlow.API.Tests.Integration;

public class TestDatabaseMigrationTests{

    [Fact]
    public async Task InitializeTestDatabase(){
        using var factory = new NexaFlowWebApplicationFactory();
        using var scope = factory.Services.CreateScope();

        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var connectionString =TestDatabaseSafety.ValidateConnection(
                context.Database.GetConnectionString());

        var connectionSettings = new NpgsqlConnectionStringBuilder(connectionString);

        Assert.True(connectionSettings.Host is "localhost" or "127.0.0.1");

        await using var connection = new NpgsqlConnection(connectionString);
        await connection.OpenAsync();
        
        await using var command = new NpgsqlCommand("SELECT current_database()", connection);

        var actualDatabase = (string?)await command.ExecuteScalarAsync();
        Assert.Equal("nexaflow_test_db", actualDatabase);

        // Only after verifying the actual database
        // may EF Core apply pending migrations.
        await context.Database.MigrateAsync();

        Assert.Empty(await context.Database.GetPendingMigrationsAsync());
    }
}