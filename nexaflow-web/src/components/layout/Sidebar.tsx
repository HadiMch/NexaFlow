
import { NavLink } from 'react-router'

import {
  ArrowLeftToLine,
  ArrowRightToLine,
  Layers3,
  X,
} from 'lucide-react'

import { navigationItems } from '../../config/navigation'

interface SidebarProps {
  collapsed: boolean
  mobileOpen: boolean
  onToggleCollapse: () => void
  onCloseMobile: () => void
}

export default function Sidebar({
  collapsed,
  mobileOpen,
  onToggleCollapse,
  onCloseMobile,
}: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        id="nexaflow-sidebar"
        aria-label="Primary navigation"
        className={`
          fixed inset-y-0 left-0 z-50 flex flex-col
          bg-[#0B1220] text-slate-300
          shadow-2xl transition-[width,transform] duration-300
          ease-in-out
          lg:sticky lg:top-0 lg:z-30 lg:h-screen
          lg:shrink-0 lg:translate-x-0 lg:shadow-none
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          ${collapsed ? 'w-72 lg:w-[84px]' : 'w-72'}
        `}
      >
        {/* Brand */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-white/10 px-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-950/40">
              <Layers3 size={23} className="text-white" />
            </div>

            {(!collapsed || mobileOpen) && (
              <div className={collapsed ? 'lg:hidden' : ''}>
                <h1 className="text-lg font-bold tracking-tight text-white">
                  NexaFlow
                </h1>
                <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-slate-400">
                  Business Suite
                </p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Close menu"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-6">
          {!collapsed && (
            <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Workspace
            </p>
          )}

          <nav className="space-y-1.5">
            {navigationItems.map((item) => {
              const Icon = item.icon

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={onCloseMobile}
                  title={collapsed ? item.name : undefined}
                  className={({ isActive }) => `
                    group relative flex min-h-12 items-center
                    gap-3 rounded-xl px-3 py-3 text-sm
                    font-medium transition-all duration-200
                    ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-950/30'
                        : 'text-slate-400 hover:bg-white/10 hover:text-white'
                    }
                    ${collapsed ? 'lg:justify-center' : ''}
                  `}
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={20}
                        strokeWidth={isActive ? 2.2 : 1.8}
                        className="shrink-0"
                      />

                      <span
                        className={`min-w-0 flex-1 truncate ${
                          collapsed ? 'lg:hidden' : ''
                        }`}
                      >
                        {item.name}
                      </span>

                      {isActive && !collapsed && (
                        <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
                      )}
                    </>
                  )}
                </NavLink>
              )
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-white/10 p-3">
          <div
            className={`
              mb-3 rounded-xl border border-white/10
              bg-white/[0.04] px-3 py-3
              ${collapsed ? 'lg:hidden' : ''}
            `}
          >
            <p className="text-xs font-semibold text-slate-200">
              NexaFlow Workspace
            </p>
            <p className="mt-1 text-[11px] leading-5 text-slate-400">
              Manage your business in one place.
            </p>
          </div>

          <button
            type="button"
            onClick={onToggleCollapse}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={
              collapsed ? 'Expand sidebar' : 'Collapse sidebar'
            }
            aria-expanded={!collapsed}
            className="hidden w-full items-center justify-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/10 hover:text-white lg:flex"
          >
            {collapsed ? (
              <ArrowRightToLine size={19} />
            ) : (
              <>
                <ArrowLeftToLine size={19} />
                <span>Collapse sidebar</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  )
}