
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

// Inventory Management
builder.Services.AddScoped<ProductService>();

// Customer Activity / CRM
builder.Services.AddScoped<CustomerActivityService>();

// Task Management
builder.Services.AddScoped<BusinessTaskService>();
builder.Services.AddScoped<BusinessTaskStatsService>();

// Analytics and Reporting
builder.Services.AddScoped<AnalyticsService>();
builder.Services.AddScoped<TaskTrendService>();

// ==================================================
// 3. AI ASSISTANT SERVICES
// ==================================================

// AI Assistant orchestration
builder.Services.AddScoped<AiAssistantService>();

// Groq AI HTTP Client
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
// 5. REACT FRONTEND CORS CONFIGURATION
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
// 6. AI RATE LIMITING CONFIGURATION
// ==================================================

builder.Services.AddAiRateLimiting();

// ==================================================
// 7. BUILD APPLICATION
// ==================================================

var app = builder.Build();

// ==================================================
// 8. DEVELOPMENT DOCUMENTATION
// ==================================================

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();

    app.UseSwaggerUI();

    app.MapOpenApi();
}

// ==================================================
// 9. HTTP REQUEST PIPELINE
// ==================================================

// Redirect HTTP requests to HTTPS when configured.
app.UseHttpsRedirection();

// Enable endpoint routing.
app.UseRouting();

// Allow requests from the React development frontend.
app.UseCors("ReactDevelopment");

// Apply the registered AI rate-limiting policy.
app.UseRateLimiter();

// Authorization middleware.
app.UseAuthorization();

// Map all API controllers.
app.MapControllers();

// ==================================================
// 10. START APPLICATION
// ==================================================

app.Run();

public partial class Program { }