
using System;
using NexaFlow.API.Tests.Helpers;
using Xunit;

namespace NexaFlow.API.Tests.Helpers;

public class TestDatabaseSafetyTests{

    [Theory]
    [InlineData("nexaflow_db")]
    [InlineData("postgres")]
    [InlineData("other_database")]
    public void ValidateConnection_RejectsUnsafeDatabaseNames(string databaseName){
        var connectionString =$"Host=localhost;Database={databaseName};Username=postgres;Password=test";
        Assert.Throws<InvalidOperationException>(() => TestDatabaseSafety.ValidateConnection(connectionString));
    }

    [Fact]
    public void ValidateConnection_RejectsNullConnectionString(){
        Assert.Throws<InvalidOperationException>(() => TestDatabaseSafety.ValidateConnection(null));
    }

    [Fact]
    public void ValidateConnection_AcceptsTestDatabase(){
        const string connectionString ="Host=localhost;Database=nexaflow_test_db;Username=postgres;Password=test";
        var result =TestDatabaseSafety.ValidateConnection(connectionString);
        Assert.Equal(connectionString, result);
    }
}