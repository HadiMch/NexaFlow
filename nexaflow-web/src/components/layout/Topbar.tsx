
import { Link, useLocation } from 'react-router'

import {
  CalendarDays,
  ChevronRight,
  Menu,
  Search,
  Sparkles,
} from 'lucide-react'

import { navigationItems } from '../../config/navigation'

interface TopbarProps {
  onOpenMenu: () => void
}

export default function Topbar({
  onOpenMenu,
}: TopbarProps) {
  const location = useLocation()

  const currentPage =
    navigationItems.find(
      (item) => item.path === location.pathname
    ) ?? navigationItems[0]

  const today = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date())

  return (
    <header className="sticky top-0 z-20 flex h-20 shrink-0 items-center justify-between gap-4 border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      {/* Left section */}
      <div className="flex min-w-0 items-center gap-4">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Open navigation menu"
          aria-controls="nexaflow-sidebar"
          className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-100 lg:hidden"
        >
          <Menu size={20} />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <span>Workspace</span>
            <ChevronRight size={13} />

            <span className="truncate text-indigo-600">
              {currentPage.name}
            </span>
          </div>

          <h2 className="mt-1 truncate text-lg font-bold tracking-tight text-slate-900">
            {currentPage.name}
          </h2>
        </div>
      </div>

      {/* Right section */}
      <div className="flex shrink-0 items-center gap-3">
        <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-medium text-slate-500 xl:flex">
          <CalendarDays size={16} />
          <span>{today}</span>
        </div>

        <Link
          to="/ai-assistant"
          className="flex items-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50 px-3 py-2.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
        >
          <Sparkles size={17} />
          <span className="hidden sm:inline">Ask NexaFlow AI</span>
        </Link>

        <Link
          to="/customers"
          title="Go to customer search"
          aria-label="Go to customer management"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-indigo-600"
        >
          <Search size={18} />
        </Link>
      </div>
    </header>
  )
}
