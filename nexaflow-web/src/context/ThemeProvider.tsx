
import {
  useEffect,
  useLayoutEffect,
  useState,
} from 'react'

import type { ReactNode } from 'react'

import {
  ThemeContext,
} from './ThemeContext'

import type {
  ThemePreference,
  ResolvedTheme,
} from './ThemeContext'

const STORAGE_KEY = 'nexaflow-theme'

function isTheme(value: string | null): value is ThemePreference {
  return (
    value === 'light' ||
    value === 'dark' ||
    value === 'system'
  )
}

function loadTheme(): ThemePreference {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return isTheme(saved) ? saved : 'system'
  } catch {
    return 'system'
  }
}

function systemTheme(): ResolvedTheme {
  return window.matchMedia('(prefers-color-scheme: dark)')
    .matches
    ? 'dark'
    : 'light'
}

interface ThemeProviderProps {
  children: ReactNode
}

export default function ThemeProvider({
  children,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemePreference>(
    loadTheme
  )

  const [system, setSystem] =
    useState<ResolvedTheme>(systemTheme)

  const resolvedTheme: ResolvedTheme =
    theme === 'system' ? system : theme

  useEffect(() => {
    const media = window.matchMedia(
      '(prefers-color-scheme: dark)'
    )

    function handleChange(event: MediaQueryListEvent) {
      setSystem(event.matches ? 'dark' : 'light')
    }

    media.addEventListener('change', handleChange)

    return () => {
      media.removeEventListener('change', handleChange)
    }
  }, [])

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme
    document.documentElement.style.colorScheme = resolvedTheme
  }, [resolvedTheme])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Theme selection still works without storage.
    }
  }, [theme])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
