
import type {
  AnalyticsPeriod,
  TaskTrend,
} from '../../types/analytics'

function escapeCsvValue(value: string | number): string {
  const text = String(value)

  // Avoid spreadsheet formula injection in imported text.
  const safeText = /^[\s]*[=+\-@]/.test(text)
    ? `'${text}`
    : text

  return `"${safeText.replace(/"/g, '""')}"`
}

export function exportTaskTrendsCsv(
  trends: TaskTrend[],
  period: AnalyticsPeriod
): void {
  const headers = [
    'Date (UTC)',
    'Created Tasks',
    'Completed Tasks',
  ]

  const rows = trends.map((trend) => [
    trend.date,
    trend.createdTasks,
    trend.completedTasks,
  ])

  const csvContent = [headers, ...rows]
    .map((row) => row.map(escapeCsvValue).join(','))
    .join('\r\n')

  // UTF-8 BOM improves Excel compatibility.
  const blob = new Blob(['\uFEFF', csvContent], {
    type: 'text/csv;charset=utf-8;',
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  const today = new Date().toISOString().slice(0, 10)

  link.href = url
  link.download = `nexaflow-task-report-${period}d-${today}.csv`

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  window.setTimeout(() => {
    URL.revokeObjectURL(url)
  }, 1000)
}
