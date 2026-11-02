
export interface AnalyticsOverview {
  totalCustomers: number
  totalProducts: number
  totalStockQuantity: number
  totalInventoryValue: number
  lowStockProducts: number

  totalTasks: number
  todoTasks: number
  inProgressTasks: number
  completedTasks: number
  pendingTasks: number
  overdueTasks: number

  taskCompletionRate: number
}

export type AnalyticsPeriod = 7 | 14 | 30

export interface TaskTrend {
  date: string
  createdTasks: number
  completedTasks: number
}
