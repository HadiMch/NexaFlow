# NexaFlow

**Full-Stack Business Management Platform**

NexaFlow is a full-stack business management application built to centralize customer relationships, inventory operations, business tasks, analytics, and AI-assisted workflows through a unified, modern interface.

The project demonstrates practical full-stack development using React, TypeScript, ASP.NET Core, Entity Framework Core, and PostgreSQL, with an emphasis on maintainable architecture, testing, usability, and API reliability.

## Features

### Customer Management
- Create, view, update, and delete customer records.
- Search customers using case-insensitive matching.
- Navigate customer data with server-side pagination.
- Validate customer information through backend DTOs.

### Inventory Management
- Manage products, quantities, and prices.
- View inventory statistics and total stock value.
- Track low-stock products.
- Perform product CRUD operations through REST APIs.

### Customer Activity CRM
- Record customer interactions and activities.
- Associate activities with existing customers.
- Manage activity descriptions and types.
- Schedule optional follow-up dates.

### Business Task Management
- Create, update, and delete business tasks.
- Organize tasks by priority and status.
- Track deadlines and completion timestamps.
- View task statistics and overdue-task counts.

### Analytics Dashboard
- Monitor customers, products, inventory, and tasks.
- Calculate inventory quantities and monetary values.
- Track task completion and overdue work.
- Visualize task trends across 7-, 14-, and 30-day periods.

### AI Assistant
- Interact with an AI assistant powered by Groq.
- Support conversation history.
- Display Markdown-formatted responses.
- Handle provider errors, timeouts, and rate limits.
- Use a responsive, resizable chat interface.

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, TypeScript, Vite 8 |
| UI | Tailwind CSS 4, Lucide React |
| Routing | React Router |
| HTTP Client | Axios |
| Backend | ASP.NET Core 10, C# |
| Database | PostgreSQL |
| ORM | Entity Framework Core 10, Npgsql |
| API Documentation | Swagger, OpenAPI |
| AI Integration | Groq API |
| Backend Testing | xUnit, ASP.NET Core Integration Testing |
| Frontend Testing | Vitest, React Testing Library |
| Code Quality | ESLint, dotnet format |
| CI | GitHub Actions |
| Version Control | Git, GitHub |

## Project Structure

```text
NexaFlow/
├── .github/
│   └── workflows/
│       └── ci.yaml
├── NexaFlow.API/
│   ├── Controllers/
│   ├── Data/
│   ├── DTOs/
│   ├── Extensions/
│   ├── Migrations/
│   ├── Models/
│   ├── Properties/
│   ├── services/
│   ├── Program.cs
│   └── NexaFlow.API.csproj
├── NexaFlow.API.Tests/
│   ├── Integration/
│   ├── Customers/
│   ├── Tasks/
│   └── NexaFlow.API.Tests.csproj
├── nexaflow-web/
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## Prerequisites

Install the following before running NexaFlow locally:

- .NET SDK 10
- Node.js and npm
- PostgreSQL
- Git
- An IDE such as Visual Studio Code or Visual Studio
- A Groq API key to use the AI Assistant

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/HadiMch/NexaFlow.git
cd NexaFlow
```

### 2. Configure PostgreSQL

Create a PostgreSQL database for development, for example:

```text
nexaflow_db
```

The backend reads its database connection string from the `ConnectionStrings:DefaultConnection` configuration key.

Use .NET User Secrets to configure it locally:

```bash
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Port=5432;Database=nexaflow_db;Username=YOUR_USERNAME;Password=YOUR_PASSWORD" --project NexaFlow.API
```

Replace the placeholders with your local PostgreSQL credentials.

Do not commit database passwords or production connection strings.

### 3. Configure the AI Assistant

NexaFlow uses Groq for AI-assisted conversations.

Store the Groq API key using .NET User Secrets:

```bash
dotnet user-secrets set "Groq:ApiKey" "YOUR_GROQ_API_KEY" --project NexaFlow.API
```

Optionally configure the model:

```bash
dotnet user-secrets set "Groq:Model" "YOUR_SUPPORTED_MODEL" --project NexaFlow.API
```

If no model is configured, the backend uses the default model defined in its Groq service.

### 4. Apply database migrations

From the repository root:

```bash
dotnet ef database update --project NexaFlow.API
```

This applies the existing Entity Framework Core migrations to the configured development database.

### 5. Start the backend

```bash
dotnet run --project NexaFlow.API --launch-profile http
```

The development API listens at:

```text
http://localhost:5102
```

An HTTPS launch profile is also available.

### 6. Start the frontend

Open a second terminal:

```bash
cd nexaflow-web
npm install
npm run dev
```

Vite normally starts the frontend at:

```text
http://localhost:5173
```

The frontend currently configures its Axios API base URL in nexaflow-web/src/services/api.ts. For local development, ensure this URL matches the running backend, normally http://localhost:5102.

## API Documentation

NexaFlow includes interactive API documentation through Swagger UI.

Start the backend in the Development environment and visit:

**Swagger UI:** http://localhost:5102/swagger/index.html

**OpenAPI JSON:** http://localhost:5102/swagger/v1/swagger.json

The API is organized into six areas:

| API Group | Main Route |
|---|---|
| Customers | `/api/customers` |
| Products | `/api/products` |
| Customer Activities | `/api/customeractivities` |
| Business Tasks | `/api/businesstasks` |
| Analytics | `/api/analytics` |
| AI Assistant | `/api/ai-assistant` |

Swagger documents request parameters, response types, and supported HTTP status codes.

## Testing

### Backend

Build the backend test project:

```bash
dotnet build NexaFlow.API.Tests/NexaFlow.API.Tests.csproj

dotnet vstest NexaFlow.API.Tests/bin/Debug/net10.0/NexaFlow.API.Tests.dll --logger:"console;verbosity=normal"

```

Run the automated backend tests:

```bash
dotnet test NexaFlow.API.Tests/NexaFlow.API.Tests.csproj

dotnet vstest NexaFlow.API.Tests/bin/Debug/net10.0/NexaFlow.API.Tests.dll --logger:"console;verbosity=normal"

```

The backend integration tests require a dedicated PostgreSQL database named nexaflow_test_db. The test connection string is configured separately using the test project's .NET User Secrets. The test infrastructure validates the database connection to help prevent accidental changes to the development database.

**Current verified baseline: 86 passing backend tests.**

### Frontend

From `nexaflow-web`:

```bash
npm run lint
npm run build
npm run test:run
```

The frontend uses Vitest for automated testing.

## Quality and Reliability

NexaFlow includes:

- DTO-based request validation.
- Centralized exception handling using HTTP Problem Details.
- Documented REST API endpoints.
- AI request rate limiting.
- Explicit handling for AI provider failures and timeouts.
- Database safety checks in integration tests.
- Automated backend regression tests.
- C# formatting verification.
- Dependency vulnerability auditing.
- GitHub Actions CI configuration.

## Security Considerations

Development credentials are stored outside source control using .NET User Secrets or ignored local configuration files.

Authentication and authorization are not yet implemented. The current application is intended for local development and portfolio demonstration, not unrestricted public production deployment.

Before production deployment, the application will require appropriate access controls, production configuration, and further security hardening.

## Future Improvements

Potential upcoming improvements include:

- Authentication and role-based authorization.
- Improved deployment configuration.
- Additional automated tests.
- Observability and monitoring.
- Production deployment and hosting.

## Project Status

NexaFlow is an actively developed full-stack portfolio project.

Its six core functional modules are implemented, and the backend has undergone dedicated reliability and API documentation improvements.

## Author

Developed by **Hadi Mcheimech**

GitHub: https://github.com/HadiMch

---

*NexaFlow — Organize business operations, understand performance, and work smarter.*