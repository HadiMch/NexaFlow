
export interface Product {
  id: number
  name: string
  sku: string
  quantity: number
  price: number
  createdAt: string
}


export interface ProductInput {
  name: string
  sku: string
  quantity: number
  price: number
}


export interface InventoryStats {
  totalProducts: number
  totalStockQuantity: number
  lowStockProducts: number
  totalInventoryValue: number
}
