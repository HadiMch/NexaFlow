
import type { AnalyticsOverview } from '../../types/analytics'

function escapeCsv(value: string | number): string {
  const text = String(value)

  const safeText = /^[\s]*[=+\-@]/.test(text)
    ? `'${text}`
    : text

  return `"${safeText.replace(/"/g, '""')}"`
}

export function exportAnalyticsOverviewCsv(
  overview: AnalyticsOverview
): void {
  const rows: (string | number)[][] = [
    ['Category', 'Metric', 'Value'],

    ['Customers', 'Total Customers', overview.totalCustomers],

    ['Inventory', 'Total Products', overview.totalProducts],
    ['Inventory', 'Total Stock Quantity', overview.totalStockQuantity],
    ['Inventory', 'Total Inventory Value', overview.totalInventoryValue],
    ['Inventory', 'Low Stock Products', overview.lowStockProducts],

    ['Tasks', 'Total Tasks', overview.totalTasks],
    ['Tasks', 'To Do Tasks', overview.todoTasks],
    ['Tasks', 'In Progress Tasks', overview.inProgressTasks],
    ['Tasks', 'Completed Tasks', overview.completedTasks],
    ['Tasks', 'Pending Tasks', overview.pendingTasks],
    ['Tasks', 'Overdue Tasks', overview.overdueTasks],
    ['Performance', 'Task Completion Rate (%)', overview.taskCompletionRate],
  ]

  const csv = rows
    .map((row) => row.map(escapeCsv).join(','))
    .join('\r\n')

  const blob = new Blob(['\uFEFF', csv], {
    type: 'text/csv;charset=utf-8;',
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  const today = new Date().toISOString().slice(0, 10)

  link.href = url
  link.download = `nexaflow-business-overview-${today}.csv`

  document.body.appendChild(link)
  link.click()
  link.remove()

  window.setTimeout(() => {
    URL.revokeObjectURL(url)
  }, 1000)
}
