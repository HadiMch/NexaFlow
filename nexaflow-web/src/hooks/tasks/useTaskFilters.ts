
import { useState } from 'react'

import type {
  BusinessTask,
  TaskPriority,
  TaskStatus,
} from '../../types/businessTask'

export type TaskSort =
  | 'newest'
  | 'oldest'
  | 'dueSoon'
  | 'priority'

export function useTaskFilters(tasks: BusinessTask[]) {
  const [search, setSearch] = useState('')

  const [statusFilter, setStatusFilter] =
    useState<TaskStatus | 'All'>('All')

  const [priorityFilter, setPriorityFilter] =
    useState<TaskPriority | 'All'>('All')

  const [sortBy, setSortBy] = useState<TaskSort>('newest')

  // Search and filter
  const searchTerm = search.trim().toLowerCase()

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === 'All' ||
      task.status === statusFilter

    const matchesPriority =
      priorityFilter === 'All' ||
      task.priority === priorityFilter

    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm) ||
      (task.description ?? '')
        .toLowerCase()
        .includes(searchTerm)

    return (
      matchesStatus &&
      matchesPriority &&
      matchesSearch
    )
  })

  // Sort filtered results
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return (
          new Date(a.createdAt).getTime() -
          new Date(b.createdAt).getTime()
        )

      case 'dueSoon': {
        const dateA = a.dueDate
          ? new Date(a.dueDate).getTime()
          : Infinity

        const dateB = b.dueDate
          ? new Date(b.dueDate).getTime()
          : Infinity

        return dateA - dateB
      }

      case 'priority': {
        const priorityOrder = {
          High: 0,
          Medium: 1,
          Low: 2,
        }

        return (
          priorityOrder[a.priority] -
          priorityOrder[b.priority]
        )
      }

      case 'newest':
      default:
        return (
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
        )
    }
  })

  return {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    sortBy,
    setSortBy,
    filteredTasks,
    sortedTasks,
  }
}