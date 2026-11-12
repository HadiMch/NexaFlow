# NexaFlow — Frontend

The React and TypeScript frontend for **NexaFlow**, a full-stack business management platform.

The application provides a responsive interface for customer management, inventory, CRM activities, business tasks, analytics, and an AI assistant.

## Technology Stack

| Technology | Purpose |
|---|---|
| React 19 | User interface |
| TypeScript | Type-safe development |
| Vite 8 | Development server and bundling |
| Tailwind CSS 4 | Styling |
| React Router | Client-side navigation |
| Axios | Backend API communication |
| Lucide React | Icons |
| React Markdown | AI response rendering |
| Vitest | Frontend testing |
| React Testing Library | Component testing |

## Features

- Customer and inventory management
- Customer activity CRM
- Business task management
- Analytics dashboard
- AI Assistant with Markdown rendering
- Dark and light themes
- Responsive navigation and layout
- Resizable AI chat interface
- Route-level lazy loading

## Getting Started

### 1. Install dependencies

From the `nexaflow-web` directory:

```bash
npm install
```

### 2. Start the backend

The frontend requires the NexaFlow ASP.NET Core API.

From the repository root:

```bash
dotnet run --project NexaFlow.API --launch-profile http
```

The backend normally runs at:

`http://localhost:5102`

### 3. Configure API communication

The Axios client is defined in:

`src/services/api.ts`

Current configuration:

```typescript
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5102/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

export default api
```

The API base URL is currently hardcoded for local development. Update this configuration if the backend is hosted elsewhere.

Environment-based configuration can be introduced before deployment.

### 4. Start the frontend

```bash
npm run dev
```

Vite normally serves the application at:

`http://localhost:5173`

## Available Commands

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Vitest |
| `npm run test:run` | Run tests once |
| `npm run test:coverage` | Run tests with coverage |

## Application Architecture

The frontend uses reusable React components, TypeScript, shared API services, and modular application features.

Its design emphasizes:

- Reusable interface components
- Consistent styling and design tokens
- Separation of UI and API communication
- Maintainable state and component logic
- Responsive layouts
- Route-level lazy loading

## API Integration

The frontend communicates with NexaFlow's REST API through Axios.

The backend provides endpoints for:

- Customers
- Products and inventory
- Customer activities
- Business tasks
- Analytics
- AI Assistant

Swagger documentation is available when the backend runs in Development:

`http://localhost:5102/swagger/index.html`

## Testing and Code Quality

Run:

```bash
npm run lint
npm run build
npm run test:run
```

The project uses ESLint, TypeScript, and Vitest to support maintainability and automated verification.

The GitHub Actions workflow currently runs frontend lint and production build checks.

## Development Status

The six core modules are implemented, with additional improvements planned for production readiness.

Authentication and authorization have not yet been implemented.

This frontend is currently intended for local development and portfolio demonstration.

## Main Project

See the [NexaFlow repository README](../README.md) for backend setup, database configuration, API documentation, and full project information.
