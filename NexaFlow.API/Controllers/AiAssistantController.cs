
using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using NexaFlow.API.DTOs.AI;
using NexaFlow.API.Extensions;
using NexaFlow.API.Services;

namespace NexaFlow.API.Controllers;

[ApiController]
[Route("api/ai-assistant")]
public class AiAssistantController : ControllerBase
{
    private readonly AiAssistantService _assistantService;
    private readonly ILogger<AiAssistantController> _logger;

    public AiAssistantController(
        AiAssistantService assistantService,
        ILogger<AiAssistantController> logger)
    {
        _assistantService = assistantService;
        _logger = logger;
    }

    [HttpPost("chat")]
    [EnableRateLimiting(AiRateLimitingExtensions.PolicyName)]
    public async Task<ActionResult<AiChatResponseDto>> Chat(
        [FromBody] AiChatRequestDto request)
    {
        if (string.IsNullOrWhiteSpace(request.Message))
        {
            return BadRequest(new
            {
                message = "Message cannot be empty."
            });
        }

        if (request.History == null ||
            request.History.Count > 10)
        {
            return BadRequest(new
            {
                message = "History cannot exceed 10 messages."
            });
        }

        foreach (var entry in request.History)
        {
            if (entry == null ||
                (entry.Role != "user" &&
                 entry.Role != "assistant") ||
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
            var result = await _assistantService.AskAsync(
                request.Message,
                request.History
            );

            return Ok(result);
        }
        catch (HttpRequestException ex)
            when (ex.StatusCode == HttpStatusCode.TooManyRequests)
        {
            _logger.LogWarning(
                "Groq rate limit reached."
            );

            return StatusCode(429, new
            {
                message =
                    "AI rate limit reached. Try again later."
            });
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(
                ex,
                "Groq request failed."
            );

            return StatusCode(502, new
            {
                message =
                    "The AI provider could not complete the request."
            });
        }
        catch (TaskCanceledException ex)
        {
            _logger.LogWarning(
                ex,
                "Groq request timed out."
            );

            return StatusCode(504, new
            {
                message = "AI request timed out."
            });
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogError(
                ex,
                "AI configuration or response error."
            );

            return StatusCode(503, new
            {
                message =
                    "The AI assistant is temporarily unavailable."
            });
        }
        catch (JsonException ex)
        {
            _logger.LogError(
                ex,
                "Invalid Groq response."
            );

            return StatusCode(502, new
            {
                message =
                    "Invalid response from the AI provider."
            });
        }
    }
}
