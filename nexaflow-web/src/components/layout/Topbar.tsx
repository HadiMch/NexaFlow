
import { Link, useLocation } from 'react-router'

import {
  CalendarDays,
  ChevronRight,
  Menu,
  Search,
  Sparkles,
} from 'lucide-react'

import { navigationItems } from '../../config/navigation'
import ThemeSwitcher from './ThemeSwitcher'

interface TopbarProps {
  onOpenMenu: () => void
}

export default function Topbar({
  onOpenMenu,
}: TopbarProps) {
  const location = useLocation()

  const currentPage = navigationItems.find(
    (item) => item.path === location.pathname
  )

  const pageName = currentPage?.name ?? 'Page Not Found'

  const today = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date())

  return (
    <header
      className="sticky top-0 z-20 flex min-h-20 shrink-0 flex-wrap items-center justify-between gap-3 border-b px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8"
      style={{
        background: 'var(--nf-surface)',
        borderColor: 'var(--nf-border)',
      }}
    >
      <div className="flex min-w-0 items-center gap-4">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Open navigation menu"
          aria-controls="nexaflow-sidebar"
          className="nf-focusable rounded-xl border p-2.5 lg:hidden"
          style={{
            color: 'var(--nf-text-secondary)',
            borderColor: 'var(--nf-border)',
          }}
        >
          <Menu size={20} />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs font-medium">
            <span className="nf-text-muted">Workspace</span>
            <ChevronRight
              size={13}
              className="nf-text-muted"
            />
            <span
              className="truncate"
              style={{ color: 'var(--nf-primary-text)' }}
            >
              {pageName}
            </span>
          </div>

          <h2 className="nf-text-primary mt-1 truncate text-lg font-bold tracking-tight">
            {pageName}
          </h2>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <div
          className="hidden items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-medium 2xl:flex"
          style={{
            color: 'var(--nf-text-muted)',
            background: 'var(--nf-surface-muted)',
            borderColor: 'var(--nf-border)',
          }}
        >
          <CalendarDays size={16} />
          <span>{today}</span>
        </div>

        <ThemeSwitcher />

        <Link
          to="/ai-assistant"
          className="nf-focusable nf-motion flex h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold"
          style={{
            color: 'var(--nf-primary-text)',
            background: 'var(--nf-primary-soft)',
          }}
        >
          <Sparkles size={17} />
          <span className="hidden 2xl:inline">
            Ask NexaFlow AI
          </span>
        </Link>

        <Link
          to="/customers"
          title="Go to customer management"
          aria-label="Go to customer management"
          className="nf-focusable flex h-11 w-11 items-center justify-center rounded-xl border"
          style={{
            color: 'var(--nf-text-muted)',
            borderColor: 'var(--nf-border)',
          }}
        >
          <Search size={18} />
        </Link>
      </div>
    </header>
  )
}
