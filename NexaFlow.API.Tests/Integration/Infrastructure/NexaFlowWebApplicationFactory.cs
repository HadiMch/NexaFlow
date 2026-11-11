
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using NexaFlow.API.Data;
using NexaFlow.API.Tests.Helpers;
using Npgsql;

namespace NexaFlow.API.Tests.Integration.Infrastructure;

public class NexaFlowWebApplicationFactory
    : WebApplicationFactory<Program>
{
    public string TestConnectionString { get; }

    public NexaFlowWebApplicationFactory()
    {
        var configuration = new ConfigurationBuilder()
            .AddUserSecrets<NexaFlowWebApplicationFactory>(
                optional: false
            )
            .Build();

        TestConnectionString = TestDatabaseSafety.ValidateConnection(
            configuration.GetConnectionString("TestConnection")
        );

        var connection = new NpgsqlConnectionStringBuilder(
            TestConnectionString
        );

        if (connection.Host != "localhost" &&
            connection.Host != "127.0.0.1")
        {
            throw new InvalidOperationException(
                "Integration tests require local PostgreSQL."
            );
        }
    }

    protected override void ConfigureWebHost(
        IWebHostBuilder builder)
    {
        builder.UseEnvironment("Testing");

        builder.ConfigureAppConfiguration(
            (_, configuration) =>
            {
                configuration.AddInMemoryCollection(
                    new Dictionary<string, string?>
                    {
                        ["ConnectionStrings:DefaultConnection"] =
                            TestConnectionString
                    }
                );
            }
        );

        builder.ConfigureTestServices(services =>
        {
            services.RemoveAll<DbContextOptions<AppDbContext>>();

            services.AddDbContext<AppDbContext>(options =>
            {
                options.UseNpgsql(TestConnectionString);
            });
        });
    }
}
