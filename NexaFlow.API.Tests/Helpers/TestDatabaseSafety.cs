
using Npgsql;
namespace NexaFlow.API.Tests.Helpers;

public static class TestDatabaseSafety{

    private const string AllowedDatabase = "nexaflow_test_db";

    public static string ValidateConnection(string? connectionString){
        if (string.IsNullOrWhiteSpace(connectionString)){
            throw new InvalidOperationException("Test database connection is not configured.");
        }

        var builder = new NpgsqlConnectionStringBuilder(connectionString);

        if (!string.Equals(
            builder.Database,
            AllowedDatabase,
            StringComparison.Ordinal
        ))
        {
            throw new InvalidOperationException("Integration tests must use nexaflow_test_db.");
        }
        return connectionString;
    }
}