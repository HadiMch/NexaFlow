
using Microsoft.EntityFrameworkCore;
using NexaFlow.API.Data;
using NexaFlow.API.Extensions;
using NexaFlow.API.Services;

var builder = WebApplication.CreateBuilder(args);

// ==================================================
// 1. DATABASE CONFIGURATION
// ==================================================

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(
        builder.Configuration.GetConnectionString(
            "DefaultConnection"
        )
    );
});

// ==================================================
// 2. BUSINESS SERVICES
// ==================================================

builder.Services.AddScoped<ProductService>();
builder.Services.AddScoped<CustomerActivityService>();

builder.Services.AddScoped<BusinessTaskService>();
builder.Services.AddScoped<BusinessTaskStatsService>();

builder.Services.AddScoped<AnalyticsService>();
builder.Services.AddScoped<TaskTrendService>();

// ==================================================
// 3. AI ASSISTANT SERVICES
// ==================================================

builder.Services.AddScoped<AiAssistantService>();

builder.Services.AddHttpClient<GroqService>(client =>
{
    client.Timeout = TimeSpan.FromSeconds(60);
});

// ==================================================
// 4. API CONTROLLERS AND DOCUMENTATION
// ==================================================

builder.Services.AddControllers();

builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ==================================================
// 5. GLOBAL ERROR HANDLING
// ==================================================

// Register standardized HTTP Problem Details responses.
builder.Services.AddProblemDetails();

// ==================================================
// 6. REACT FRONTEND CORS CONFIGURATION
// ==================================================

builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactDevelopment", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// ==================================================
// 7. AI RATE LIMITING CONFIGURATION
// ==================================================

builder.Services.AddAiRateLimiting();

// ==================================================
// 8. BUILD APPLICATION
// ==================================================

var app = builder.Build();

// ==================================================
// 9. GLOBAL EXCEPTION HANDLING
// ==================================================

// Catch otherwise unhandled exceptions and return
// standardized HTTP 500 Problem Details responses.
// The framework also logs unhandled exceptions.
app.UseExceptionHandler();

// ==================================================
// 10. DEVELOPMENT DOCUMENTATION
// ==================================================

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.MapOpenApi();
}

// ==================================================
// 11. HTTP REQUEST PIPELINE
// ==================================================

// Disable HTTPS redirection only in integration tests.
// Keep HTTPS redirection for all other environments.
if (!app.Environment.IsEnvironment("Testing"))
{
    app.UseHttpsRedirection();
}

app.UseRouting();

app.UseCors("ReactDevelopment");

app.UseRateLimiter();

app.UseAuthorization();

app.MapControllers();

// ==================================================
// 12. START APPLICATION
// ==================================================

app.Run();

public partial class Program { }