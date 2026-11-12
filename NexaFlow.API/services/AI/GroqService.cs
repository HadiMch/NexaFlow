
using System.Net.Http.Headers;
using System.Net.Http.Json;
using NexaFlow.API.DTOs.AI;
using NexaFlow.API.DTOs.Analytics;
using NexaFlow.API.Services.AI;

namespace NexaFlow.API.Services;

public class GroqService
{
    private const string Endpoint = "https://api.groq.com/openai/v1/chat/completions";
    private const string DefaultModel = "openai/gpt-oss-20b";
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public GroqService(
        HttpClient httpClient,
        IConfiguration configuration)
    {
        _httpClient = httpClient;
        _configuration = configuration;
    }

    public async Task<string> GenerateResponseAsync(
        string question,
        AnalyticsOverviewDto overview,
        IReadOnlyList<ChatHistoryMessageDto> history)
    {
        var apiKey = _configuration["Groq:ApiKey"];
        var model = _configuration["Groq:Model"] ?? DefaultModel;

        if (string.IsNullOrWhiteSpace(apiKey))
        {
            throw new InvalidOperationException("Groq API key is not configured.");
        }

        var messages = GroqMessageBuilder.Build(
            question,
            overview,
            history
        );

        var payload = new
        {
            model,
            messages,
            max_completion_tokens = 1200
        };

        using var request = new HttpRequestMessage(HttpMethod.Post, Endpoint);
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

        request.Content = JsonContent.Create(
            payload,
            options: new System.Text.Json.JsonSerializerOptions
            {
                PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase
            }
        );

        using var response = await _httpClient.SendAsync(request);

        if (!response.IsSuccessStatusCode)
        {
            throw new HttpRequestException(
                $"Groq API request failed with HTTP " +
                $"{(int)response.StatusCode}.",
                null,
                response.StatusCode
            );
        }
        using var stream = await response.Content.ReadAsStreamAsync();
        return await GroqResponseParser.ParseAsync(stream);
    }
}