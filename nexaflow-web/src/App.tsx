
import { BrowserRouter, NavLink, Route, Routes } from 'react-router'
import Customers from './pages/Customers'
import Inventory from './pages/Inventory'
import CustomerCountCard from './components/dashboard/CustomerCountCard'
import InventoryStatsCards from './components/dashboard/InventoryStatsCards'

const menuItems = [
  { name: 'Dashboard', path: '/' },
  { name: 'Customers', path: '/customers' },
  { name: 'Inventory', path: '/inventory' },
  { name: 'Employees & Tasks', path: '/tasks' },
  { name: 'Analytics', path: '/analytics' },
  { name: 'AI Assistant', path: '/ai-assistant' },
]

function Dashboard() {
  return (
    <>
      <h2 className="text-3xl font-bold text-slate-900">
        Dashboard
      </h2>

      <p className="mt-2 text-slate-500">
        Welcome to your business management platform.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <CustomerCountCard />
        <InventoryStatsCards />
      </div>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-slate-100">

        {/* Sidebar */}
        <aside className="w-64 shrink-0 bg-slate-900 p-6 text-white">
          <h1 className="mb-10 text-2xl font-bold">
            NexaFlow
          </h1>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-3 ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="min-w-0 flex-1 p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route
              path="*"
              element={
                <h2 className="text-2xl font-bold text-slate-900">
                  Page coming soon
                </h2>
              }
            />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  )
}

export default App
