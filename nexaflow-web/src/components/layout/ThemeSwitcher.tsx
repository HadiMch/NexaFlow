
import { Monitor, Moon, Sun } from 'lucide-react'

import { useTheme } from '../../hooks/useTheme'

import type { ThemePreference } from '../../context/ThemeContext'

const options: {
  value: ThemePreference
  label: string
  icon: typeof Sun
}[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
]

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <div
      role="group"
      aria-label="Appearance"
      className="flex items-center gap-1 rounded-xl border p-1"
      style={{
        background: 'var(--nf-surface-muted)',
        borderColor: 'var(--nf-border)',
      }}
    >
      {options.map(({ value, label, icon: Icon }) => {
        const active = theme === value

        return (
          <button
            key={value}
            type="button"
            title={`${label} theme`}
            aria-label={`${label} theme`}
            aria-pressed={active}
            onClick={() => setTheme(value)}
            className="nf-motion flex h-9 w-9 items-center justify-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 sm:w-auto sm:gap-2 sm:px-3"
            style={{
              background: active
                ? 'var(--nf-primary-soft)'
                : 'transparent',
              color: active
                ? 'var(--nf-primary-text)'
                : 'var(--nf-text-muted)',
            }}
          >
            <Icon size={16} aria-hidden="true" />
            <span className="hidden text-xs font-semibold xl:inline">
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
