
using System.Text.Json;
using NexaFlow.API.DTOs.AI;
using NexaFlow.API.DTOs.Analytics;

namespace NexaFlow.API.Services.AI;

public static class GroqMessageBuilder
{
    private const int MaxHistoryMessages = 10;

    public static List<GroqChatMessage> Build(
        string question,
        AnalyticsOverviewDto overview,
        IReadOnlyList<ChatHistoryMessageDto> history)
    {
        var businessData = JsonSerializer.Serialize(overview);

        var messages = new List<GroqChatMessage>
        {
            new(
                "system",
                GroqSystemPrompt.Instructions
            ),

            new(
                "system",
                "Current NexaFlow aggregate business statistics: " +
                businessData
            )
        };

        foreach (var entry in history.TakeLast(MaxHistoryMessages))
        {
            messages.Add(new GroqChatMessage(
                entry.Role,
                entry.Content
            ));
        }

        messages.Add(new GroqChatMessage(
            "user",
            question
        ));

        return messages;
    }
}

public record GroqChatMessage(
    string Role,
    string Content
);
