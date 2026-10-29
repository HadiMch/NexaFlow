
export interface Customer {
  id: number
  name: string
  email: string
  phone: string
  createdAt: string
}

export interface CustomerInput {
  name: string
  email: string
  phone: string
}


export interface PagedResult<T> {
  items: T[]
  totalCount: number
  page: number
  pageSize: number
  totalPages: number
}
