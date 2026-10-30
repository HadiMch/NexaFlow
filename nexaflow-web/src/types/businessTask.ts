
export type TaskPriority = 'Low' | 'Medium' | 'High'

export type TaskStatus = 'To Do' | 'In Progress' | 'Completed'

export interface BusinessTask {
  id: number
  title: string
  description: string | null
  priority: TaskPriority
  status: TaskStatus
  dueDate: string | null
  createdAt: string
  completedAt: string | null
}

export interface CreateBusinessTaskInput {
  title: string
  description: string | null
  priority: TaskPriority
  status: TaskStatus
  dueDate: string | null
}

export type UpdateBusinessTaskInput = CreateBusinessTaskInput

export interface BusinessTaskStats {
  totalTasks: number
  todoTasks: number
  inProgressTasks: number
  completedTasks: number
  overdueTasks: number
}