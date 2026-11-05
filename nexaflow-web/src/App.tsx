import { BrowserRouter, Link, Route, Routes } from "react-router";
import ThemeProvider from "./context/ThemeProvider";
import ToastProvider from "./context/ToastProvider";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Inventory from "./pages/Inventory";
import Tasks from "./pages/Tasks";
import Analytics from "./pages/Analytics";
import AiAssistant from "./pages/AiAssistant";
import "./styles/design-system.css";

function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1
        className="text-6xl font-bold"
        style={{ color: "var(--nf-primary-text)" }}
      >
        404
      </h1>

      <h2 className="nf-text-primary mt-4 text-2xl font-bold">
        Page not found
      </h2>

      <p className="nf-text-muted mt-2 text-sm">
        The page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="nf-button-primary nf-focusable nf-motion mt-6 rounded-xl px-5 py-3 text-sm font-semibold"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/ai-assistant" element={<AiAssistant />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
