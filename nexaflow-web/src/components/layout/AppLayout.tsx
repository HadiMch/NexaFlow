
import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router'

import Sidebar from './Sidebar'
import Topbar from './Topbar'

const SIDEBAR_STORAGE_KEY = 'nexaflow-sidebar-collapsed'

function loadSidebarPreference(): boolean {
  try {
    return localStorage.getItem(SIDEBAR_STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

export default function AppLayout() {
  const [collapsed, setCollapsed] =
    useState(loadSidebarPreference)

  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    try {
      localStorage.setItem(
        SIDEBAR_STORAGE_KEY,
        String(collapsed)
      )
    } catch {
      // Sidebar still works without browser storage.
    }
  }, [collapsed])

  useEffect(() => {
    if (!mobileOpen) return

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMobileOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [mobileOpen])

  useEffect(() => {
    if (!mobileOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [mobileOpen])

  return (
    <div
      className="flex min-h-screen"
      style={{ background: 'var(--nf-background)' }}
    >
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onToggleCollapse={() =>
          setCollapsed((previous) => !previous)
        }
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Topbar
          onOpenMenu={() => setMobileOpen(true)}
        />

        <main
          key={location.pathname}
          className="nf-page min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8"
        >
          <div className="mx-auto w-full max-w-[1600px]">
            <Outlet />
          </div>
        </main>

        <footer
          className="border-t px-4 py-4 text-center text-xs sm:px-6 lg:px-8"
          style={{
            color: 'var(--nf-text-muted)',
            borderColor: 'var(--nf-border)',
          }}
        >
          NexaFlow · Business Management Platform
        </footer>
      </div>
    </div>
  )
}
