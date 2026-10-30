
import type { BusinessTask } from '../types/businessTask'

export interface TaskStatistic {
  label: string
  value: number
}

export function calculateTaskStatistics(
  tasks: BusinessTask[],
  currentTime: number | null
): TaskStatistic[] {
  const total = tasks.length

  const todo = tasks.filter(
    (task) => task.status === 'To Do'
  ).length

  const inProgress = tasks.filter(
    (task) => task.status === 'In Progress'
  ).length

  const completed = tasks.filter(
    (task) => task.status === 'Completed'
  ).length

  const overdue = tasks.filter(
    (task) =>
      currentTime !== null &&
      task.dueDate !== null &&
      task.status !== 'Completed' &&
      new Date(task.dueDate).getTime() < currentTime
  ).length

  return [
    { label: 'Total Tasks', value: total },
    { label: 'To Do', value: todo },
    { label: 'In Progress', value: inProgress },
    { label: 'Completed', value: completed },
    { label: 'Overdue', value: overdue },
  ]
}
