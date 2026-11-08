import { lazy, Suspense } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router";
import ThemeProvider from "./context/ThemeProvider";
import ToastProvider from "./context/ToastProvider";
import AppLayout from "./components/layout/AppLayout";
import "./styles/design-system.css";

/*
 * Lazy-loaded pages
 *
 * Each page is loaded when its route is visited,
 * reducing the initial JavaScript bundle.
 */

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Customers = lazy(() => import("./pages/Customers"));
const Inventory = lazy(() => import("./pages/Inventory"));
const Tasks = lazy(() => import("./pages/Tasks"));
const Analytics = lazy(() => import("./pages/Analytics"));
const AiAssistant = lazy(() => import("./pages/AiAssistant"));

function PageLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[45vh] flex-col items-center justify-center gap-4"
    >
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600 dark:border-slate-700 dark:border-t-indigo-400"
        aria-hidden="true"
      />

      <p className="nf-text-muted text-sm font-medium">Loading workspace...</p>
    </div>
  );
}

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
              <Route
                index
                element={
                  <Suspense fallback={<PageLoader />}>
                    <Dashboard />
                  </Suspense>
                }
              />

              <Route
                path="/customers"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <Customers />
                  </Suspense>
                }
              />

              <Route
                path="/inventory"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <Inventory />
                  </Suspense>
                }
              />

              <Route
                path="/tasks"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <Tasks />
                  </Suspense>
                }
              />

              <Route
                path="/analytics"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <Analytics />
                  </Suspense>
                }
              />

              <Route
                path="/ai-assistant"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <AiAssistant />
                  </Suspense>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
