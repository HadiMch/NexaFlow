
using System.Text.Json;

namespace NexaFlow.API.Services.AI;

public static class GroqResponseParser
{
    public static async Task<string> ParseAsync(
        Stream responseStream)
    {
        using var document =
            await JsonDocument.ParseAsync(responseStream);

        var root = document.RootElement;

        if (!root.TryGetProperty("choices", out var choices) ||
            choices.ValueKind != JsonValueKind.Array ||
            choices.GetArrayLength() == 0)
        {
            throw new InvalidOperationException(
                "Groq returned no response choices.");
        }

        var firstChoice = choices[0];

        if (!firstChoice.TryGetProperty(
                "message",
                out var responseMessage) ||
            !responseMessage.TryGetProperty(
                "content",
                out var content) ||
            content.ValueKind != JsonValueKind.String)
        {
            throw new InvalidOperationException(
                "Groq returned no message content.");
        }

        var answer = content.GetString();

        if (string.IsNullOrWhiteSpace(answer))
        {
            throw new InvalidOperationException(
                "Groq returned an empty response.");
        }

        return answer;
    }
}
