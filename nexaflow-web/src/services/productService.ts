
import api from './api'
import type { Product, ProductInput } from '../types/product'

export const productService = {
 

    // Get all products
  getAll: async (): Promise<Product[]> => {
    const response = await api.get<Product[]>('/products')
    return response.data
  },


  // Get a product by ID
  getById: async (id: number): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`)
    return response.data
  },


  // Create a product
  create: async (data: ProductInput): Promise<Product> => {
    const response = await api.post<Product>('/products', data)
    return response.data
  },

  
  // Update a product
  update: async (id: number, data: ProductInput): Promise<void> => {
    await api.put(`/products/${id}`, data)
  },

  
  // Delete a product
  delete: async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`)
  },
}
