
import api from './api'
import type {
  BusinessTask,
  CreateBusinessTaskInput,
  UpdateBusinessTaskInput,
  BusinessTaskStats,
} from '../types/businessTask'

export const businessTaskService = {
  getAll: async (): Promise<BusinessTask[]> => {
    const response = await api.get<BusinessTask[]>('/BusinessTasks')
    return response.data
  },

  
  getStats: async (): Promise<BusinessTaskStats> => {
    const response = await api.get<BusinessTaskStats>('/BusinessTasks/stats')
  return response.data
  },


  getById: async (id: number): Promise<BusinessTask> => {
    const response = await api.get<BusinessTask>(`/BusinessTasks/${id}`)
    return response.data
  },

  create: async (data: CreateBusinessTaskInput): Promise<BusinessTask> => {
    const response = await api.post<BusinessTask>('/BusinessTasks', data)
    return response.data
  },

  update: async (id: number, data: UpdateBusinessTaskInput): Promise<void> => {
    await api.put(`/BusinessTasks/${id}`, data)
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/BusinessTasks/${id}`)
  },
}