
import { useState } from 'react'

import BusinessTaskForm from '../components/tasks/BusinessTaskForm'
import BusinessTaskTable from '../components/tasks/BusinessTaskTable'
import TaskStatsCards from '../components/tasks/TaskStatsCards'
import TaskFilters from '../components/tasks/TaskFilters'

import { useBusinessTasks } from '../hooks/tasks/useBusinessTasks'
import { useTaskFilters } from '../hooks/tasks/useTaskFilters'

import type {
  BusinessTask,
  CreateBusinessTaskInput,
} from '../types/businessTask'

function Tasks() {
  // Task CRUD
  const {
    tasks,
    loading,
    error,
    saving,
    deletingId,
    addTask,
    updateTask,
    deleteTask,
  } = useBusinessTasks()

  // Editing state
  const [editingTask, setEditingTask] =
    useState<BusinessTask | null>(null)

  // Search, filters and sorting
  const {
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
  } = useTaskFilters(tasks)

  // Create or update task
  async function handleSubmit(
    data: CreateBusinessTaskInput
  ): Promise<boolean> {
    if (editingTask) {
      const success = await updateTask(editingTask.id, data)

      if (success) {
        setEditingTask(null)
      }

      return success
    }

    return addTask(data)
  }

  // Delete task
  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this task?'
    )

    if (!confirmed) return

    const success = await deleteTask(id)

    if (success && editingTask?.id === id) {
      setEditingTask(null)
    }

    if (!success) {
      window.alert('Failed to delete task.')
    }
  }

  // Select task for editing
  function handleEdit(task: BusinessTask) {
    setEditingTask(task)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      {/* Page Header */}
      <h1 className="text-3xl font-bold text-slate-900">
        Task Management
      </h1>

      <p className="mt-2 text-slate-500">
        Organize tasks, manage priorities, and track progress.
      </p>

      {/* Task Statistics */}
      {!loading && !error && (
        <TaskStatsCards tasks={tasks} />
      )}

      {/* Create / Edit Form */}
      <BusinessTaskForm
        key={editingTask?.id ?? 'new'}
        editingTask={editingTask}
        saving={saving}
        onSubmit={handleSubmit}
        onCancel={() => setEditingTask(null)}
      />

      {/* Search, Filtering and Sorting */}
      <TaskFilters
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Results Count */}
      {!loading && !error && (
        <p className="mt-4 text-sm text-slate-600">
          Showing {filteredTasks.length} of {tasks.length} tasks
        </p>
      )}

      {/* Task List */}
      {loading ? (
        <p className="mt-8 text-slate-500">
          Loading tasks...
        </p>
      ) : error ? (
        <p role="alert" className="mt-8 text-red-600">
          {error}
        </p>
      ) : (
        <BusinessTaskTable
          tasks={sortedTasks}
          deletingId={deletingId}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default Tasks
