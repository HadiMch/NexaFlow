
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.RateLimiting;

namespace NexaFlow.API.Extensions;

public static class AiRateLimitingExtensions
{
    public const string PolicyName = "ai-chat";

    public static IServiceCollection AddAiRateLimiting(
        this IServiceCollection services)
    {
        services.AddRateLimiter(options =>
        {
            options.RejectionStatusCode =
                StatusCodes.Status429TooManyRequests;

            options.AddPolicy(
                PolicyName,
                context =>
                {
                    var clientIp =
                        context.Connection.RemoteIpAddress?
                            .ToString()
                        ?? "unknown";

                    return RateLimitPartition
                        .GetFixedWindowLimiter(
                            partitionKey: clientIp,
                            factory: _ =>
                                new FixedWindowRateLimiterOptions
                                {
                                    PermitLimit = 6,
                                    Window = TimeSpan.FromMinutes(1),
                                    QueueLimit = 0,
                                    AutoReplenishment = true
                                }
                        );
                }
            );

            options.OnRejected = async (context, token) =>
            {
                context.HttpContext.Response.StatusCode =
                    StatusCodes.Status429TooManyRequests;

                await context.HttpContext.Response.WriteAsJsonAsync(
                    new
                    {
                        message =
                            "Too many AI requests. " +
                            "Please try again later."
                    },
                    cancellationToken: token
                );
            };
        });

        return services;
    }
}
