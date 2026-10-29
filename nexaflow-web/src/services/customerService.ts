
import api from './api'
import type { Customer, CustomerInput, PagedResult, } from '../types/customer'

export const customerService = {


  // Retrieve customers
  
  getAll: async (page = 1, pageSize = 10, search = ''): Promise<PagedResult<Customer>> => {
    const response = await api.get<PagedResult<Customer>>(    
    '/customers',
    {
      params: { page, pageSize, search },
    }
    )
    return response.data
  },



  // Retrieve one customer
  getById: async (id: number): Promise<Customer> => {
    const response = await api.get<Customer>(`/customers/${id}`)
    return response.data
  },

  // Create a customer
  create: async (data: CustomerInput): Promise<Customer> => {
    const response = await api.post<Customer>('/customers', data)
    return response.data
  },

  // Update a customer
  update: async (id: number, data: CustomerInput): Promise<void> => {
    await api.put(`/customers/${id}`, data)
  },

  // Delete a customer
  delete: async (id: number): Promise<void> => {
    await api.delete(`/customers/${id}`)
  },

  // Search customers
  search: async (name: string): Promise<Customer[]> => {
    const response = await api.get<Customer[]>('/customers/search', {
      params: { name },
    })
    return response.data
  },
}
