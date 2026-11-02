
import api from './api'

import type {
  AnalyticsOverview,
  AnalyticsPeriod,
  TaskTrend,
} from '../types/analytics'

export const analyticsService = {
  getOverview: async (): Promise<AnalyticsOverview> => {
    const response = await api.get<AnalyticsOverview>(
      '/Analytics/overview'
    )

    return response.data
  },

  getTaskTrends: async (
    days: AnalyticsPeriod
  ): Promise<TaskTrend[]> => {
    const response = await api.get<TaskTrend[]>(
      '/Analytics/task-trends',
      {
        params: { days },
      }
    )

    return response.data
  },
}
