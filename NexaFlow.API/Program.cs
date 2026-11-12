
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi;
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

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "NexaFlow API",
        Version = "v1",
        Description =
            "NexaFlow is a full-stack business management " +
            "application providing APIs for customer management, " +
            "inventory, CRM activities, business tasks, " +
            "analytics, and an AI assistant."
    });

    var xmlFile = $"{typeof(Program).Assembly.GetName().Name}.xml";

    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    if (File.Exists(xmlPath)){
        options.IncludeXmlComments(xmlPath);
    }
    });

// ==================================================
// 5. GLOBAL ERROR HANDLING
// ==================================================

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

app.UseExceptionHandler();

// ==================================================
// 10. DEVELOPMENT DOCUMENTATION
// ==================================================

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();

    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint(
            "/swagger/v1/swagger.json",
            "NexaFlow API v1"
        );

        options.DocumentTitle = "NexaFlow API Documentation";
    });

    app.MapOpenApi();
}

// ==================================================
// 11. HTTP REQUEST PIPELINE
// ==================================================

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
