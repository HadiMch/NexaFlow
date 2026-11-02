
using NexaFlow.API.DTOs.AI;

namespace NexaFlow.API.Services;

public class AiAssistantService
{
    private readonly AnalyticsService _analyticsService;
    private readonly GroqService _groqService;

    public AiAssistantService(
        AnalyticsService analyticsService,
        GroqService groqService)
    {
        _analyticsService = analyticsService;
        _groqService = groqService;
    }

    public async Task<AiChatResponseDto> AskAsync(
        string message,
        IReadOnlyList<ChatHistoryMessageDto> history)
    {
        var overview = await _analyticsService.GetOverviewAsync();

        var reply = await _groqService.GenerateResponseAsync(
            message.Trim(),
            overview,
            history
        );

        return new AiChatResponseDto
        {
            Reply = reply,
            Source = "NexaFlow AI - Groq",
            GeneratedAt = DateTime.UtcNow
        };
    }
}
