
using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using NexaFlow.API.Tests.Integration.Infrastructure;

namespace NexaFlow.API.Tests.Integration;

public class ExceptionHandlingTests
{
    private const string SensitiveMessage =
        "Sensitive internal exception details";

    [Fact]
    public async Task UnhandledException_ReturnsInternalServerError()
    {
        using var factory = new ExceptionTestFactory();
        using var client = factory.CreateClient();

        using var response =
            await client.GetAsync("/api/customers/count");

        Assert.Equal(
            HttpStatusCode.InternalServerError,
            response.StatusCode
        );
    }

    [Fact]
    public async Task UnhandledException_ReturnsProblemDetails()
    {
        using var factory = new ExceptionTestFactory();
        using var client = factory.CreateClient();

        using var response =
            await client.GetAsync("/api/customers/count");

        Assert.Equal(
            "application/problem+json",
            response.Content.Headers.ContentType?.MediaType
        );

        using var document = JsonDocument.Parse(
            await response.Content.ReadAsStringAsync()
        );

        Assert.Equal(
            500,
            document.RootElement
                .GetProperty("status")
                .GetInt32()
        );
    }

    [Fact]
    public async Task UnhandledException_DoesNotExposeInternalDetails()
    {
        using var factory = new ExceptionTestFactory();
        using var client = factory.CreateClient();

        using var response =
            await client.GetAsync("/api/customers/count");

        var body = await response.Content.ReadAsStringAsync();

        Assert.Equal(
            HttpStatusCode.InternalServerError,
            response.StatusCode
        );

        Assert.DoesNotContain(
            SensitiveMessage,
            body,
            StringComparison.OrdinalIgnoreCase
        );

        Assert.DoesNotContain(
            "stackTrace",
            body,
            StringComparison.OrdinalIgnoreCase
        );
    }

    private sealed class ExceptionTestFactory
        : NexaFlowWebApplicationFactory
    {
        protected override void ConfigureWebHost(
            IWebHostBuilder builder)
        {
            base.ConfigureWebHost(builder);

            builder.ConfigureTestServices(services =>
            {
                services.RemoveAll<IControllerActivator>();

                services.AddSingleton<
                    IControllerActivator,
                    ThrowingControllerActivator
                >();
            });
        }
    }

    private sealed class ThrowingControllerActivator
        : IControllerActivator
    {
        public object Create(ControllerContext context)
        {
            throw new InvalidOperationException(
                SensitiveMessage
            );
        }

        public void Release(
            ControllerContext context,
            object controller)
        {
        }
    }
}