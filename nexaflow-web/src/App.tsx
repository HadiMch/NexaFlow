
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from 'react-router'

import AppLayout from './components/layout/AppLayout'

import Dashboard from './pages/Dashboard'
import Customers from './pages/Customers'
import Inventory from './pages/Inventory'
import Tasks from './pages/Tasks'
import Analytics from './pages/Analytics'
import AiAssistant from './pages/AiAssistant'

import './styles/design-system.css'

function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-indigo-600">
        404
      </h1>

      <h2 className="mt-4 text-2xl font-bold text-slate-900">
        Page not found
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        The page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="nf-motion mt-6 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        Back to Dashboard
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Dashboard />} />

          <Route
            path="/customers"
            element={<Customers />}
          />

          <Route
            path="/inventory"
            element={<Inventory />}
          />

          <Route
            path="/tasks"
            element={<Tasks />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />

          <Route
            path="/ai-assistant"
            element={<AiAssistant />}
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}