
using NexaFlow.API.Tests.Integration.Infrastructure;
using Npgsql;
namespace NexaFlow.API.Tests.Integration;

public class DatabaseConnectionTests{
    [Fact]
    public async Task TestDatabase_ShouldConnectSuccessfully(){
        using var factory = new NexaFlowWebApplicationFactory();
        await using var connection = new NpgsqlConnection(factory.TestConnectionString);
        await connection.OpenAsync();

        Assert.Equal(System.Data.ConnectionState.Open, connection.State);
    }

    [Fact]
    public async Task TestDatabase_ShouldHaveExpectedName(){
        using var factory = new NexaFlowWebApplicationFactory();
        await using var connection = new NpgsqlConnection(factory.TestConnectionString);
        await connection.OpenAsync();
        await using var command =new NpgsqlCommand("SELECT current_database()",connection);
        
        var databaseName = (string?)await command.ExecuteScalarAsync();

        Assert.Equal(
            "nexaflow_test_db",
            databaseName
        );
    }
}