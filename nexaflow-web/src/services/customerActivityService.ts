
import api from './api'
import type {
  CustomerActivity,
  CreateCustomerActivityInput,
  UpdateCustomerActivityInput,
} from '../types/customerActivity'


export const customerActivityService = {
  getByCustomer: async (customerId: number): Promise<CustomerActivity[]> => {
    const response = await api.get<CustomerActivity[]>(
      `/CustomerActivities/customer/${customerId}`
    )

    return response.data
  },


  getById: async (id: number): Promise<CustomerActivity> => {
    const response = await api.get<CustomerActivity>(`/CustomerActivities/${id}`)
    return response.data
  },


  create: async (data: CreateCustomerActivityInput): Promise<CustomerActivity> => {
    const response = await api.post<CustomerActivity>('/CustomerActivities', data)
    return response.data
  },


  update: async (id: number, data: UpdateCustomerActivityInput): Promise<void> => {
    await api.put(`/CustomerActivities/${id}`, data)
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/CustomerActivities/${id}`)
  },
}
