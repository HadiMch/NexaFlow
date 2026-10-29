
import api from './api'

export const dashboardService = {
  getCustomerCount: async (): Promise<number> => {
    const response = await api.get<number>('/customers/count')
    return response.data
  },
}
