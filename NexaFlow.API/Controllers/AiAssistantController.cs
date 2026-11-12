
using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using NexaFlow.API.DTOs.AI;
using NexaFlow.API.Extensions;
using NexaFlow.API.Services;

namespace NexaFlow.API.Controllers;

/// <summary>
/// Provides AI-powered business assistance.
/// </summary>
///
[ApiController]
[Route("api/ai-assistant")]
public class AiAssistantController : ControllerBase
{
    private readonly AiAssistantService _assistantService;
    private readonly ILogger<AiAssistantController> _logger;

    public AiAssistantController(AiAssistantService assistantService, ILogger<AiAssistantController> logger)
    {
        _assistantService = assistantService;
        _logger = logger;
    }

    /// <summary>
    /// Sends a message to the AI assistant.
    /// </summary>
    /// <remarks>
    /// Processes a user message through the configured
    /// Groq AI provider.
    ///
    /// Request requirements:
    ///
    /// - The message cannot be empty or whitespace.
    /// - Conversation history is limited to 10 messages.
    /// - History entries must use the user or assistant role.
    /// - History content cannot be empty.
    /// - Each history message is limited to 2000 characters.
    ///
    /// This endpoint is rate-limited.
    ///
    /// Possible responses:
    ///
    /// - 200: AI response generated successfully.
    /// - 400: Invalid request or conversation history.
    /// - 429: Rate limit exceeded.
    /// - 502: AI provider request or response failure.
    /// - 503: AI assistant unavailable.
    /// - 504: AI provider request timed out.
    /// </remarks>
    /// <param name="request">
    /// The user message and conversation history.
    /// </param>
    /// <returns>The AI-generated response.</returns>

    [HttpPost("chat")]
    [EnableRateLimiting(AiRateLimitingExtensions.PolicyName)]
    [ProducesResponseType(typeof(AiChatResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status429TooManyRequests)]
    [ProducesResponseType(StatusCodes.Status502BadGateway)]
    [ProducesResponseType(StatusCodes.Status503ServiceUnavailable)]
    [ProducesResponseType(StatusCodes.Status504GatewayTimeout)]
    public async Task<ActionResult<AiChatResponseDto>> Chat([FromBody] AiChatRequestDto request)
    {
        if (string.IsNullOrWhiteSpace(request.Message))
        {
            return BadRequest(new
            {
                message = "Message cannot be empty."
            });
        }

        if (request.History == null || request.History.Count > 10)
        {
            return BadRequest(new
            {
                message = "History cannot exceed 10 messages."
            });
        }

        foreach (var entry in request.History)
        {
            if (entry == null || (entry.Role != "user" && entry.Role != "assistant") ||
                string.IsNullOrWhiteSpace(entry.Content) ||
                entry.Content.Length > 2000)
            {
                return BadRequest(new
                {
                    message = "Invalid conversation history."
                });
            }
        }

        try
        {
            var result = await _assistantService.AskAsync(request.Message, request.History);
            return Ok(result);
        }
        catch (HttpRequestException ex)
            when (ex.StatusCode == HttpStatusCode.TooManyRequests)
        {
            _logger.LogWarning("Groq rate limit reached.");

            return StatusCode(429, new
            {
                message = "AI rate limit reached. Try again later."
            });
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, " Groq request failed.");

            return StatusCode(502, new
            {
                message = "The AI provider could not complete the request."
            });
        }
        catch (TaskCanceledException ex)
        {
            _logger.LogWarning(ex, "Groq request timed out.");

            return StatusCode(504, new
            {
                message = "AI request timed out."
            });
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogError(ex, " AI configuration or response error.");

            return StatusCode(503, new
            {
                message = "The AI assistant is temporarily unavailable."
            });
        }
        catch (JsonException ex)
        {
            _logger.LogError(ex, "Invalid Groq response.");

            return StatusCode(502, new
            {
                message = "Invalid response from the AI provider."
            });
        }
    }
}
