
export type CustomerActivityType =
  | 'Call'
  | 'Email'
  | 'Meeting'
  | 'Note'

export interface CustomerActivity {
  id: number
  customerId: number
  type: CustomerActivityType
  description: string
  followUpDate: string | null
  createdAt: string
}

export interface CreateCustomerActivityInput {
  customerId: number
  type: CustomerActivityType
  description: string
  followUpDate: string | null
}

export interface UpdateCustomerActivityInput {
  type: CustomerActivityType
  description: string
  followUpDate: string | null
}
