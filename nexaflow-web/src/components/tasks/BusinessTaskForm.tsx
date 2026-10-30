
import { useState } from 'react'
import type { FormEvent } from 'react'

import TaskTextFields from './TaskTextFields'
import TaskSelectFields from './TaskSelectFields'
import TaskDeadlineField from './TaskDeadlineField'

import type {
  BusinessTask,
  CreateBusinessTaskInput,
  TaskPriority,
  TaskStatus,
} from '../../types/businessTask'

interface BusinessTaskFormProps {
  editingTask: BusinessTask | null
  saving: boolean
  onSubmit: (data: CreateBusinessTaskInput) => Promise<boolean>
  onCancel: () => void
}

function BusinessTaskForm({
  editingTask,
  saving,
  onSubmit,
  onCancel,
}: BusinessTaskFormProps) {
  const [title, setTitle] = useState(editingTask?.title ?? '')

  const [description, setDescription] = useState(
    editingTask?.description ?? ''
  )

  const [priority, setPriority] = useState<TaskPriority>(
    editingTask?.priority ?? 'Medium'
  )

  const [status, setStatus] = useState<TaskStatus>(
    editingTask?.status ?? 'To Do'
  )

  const [dueDate, setDueDate] = useState(() => {
    if (!editingTask?.dueDate) return ''

    const date = new Date(editingTask.dueDate)
    const localDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    )

    return localDate.toISOString().slice(0, 16)
  })

  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    if (!title.trim()) {
      setError('Task title is required.')
      return
    }

    const success = await onSubmit({
      title: title.trim(),
      description: description.trim() || null,
      priority,
      status,
      dueDate: dueDate
        ? new Date(dueDate).toISOString()
        : null,
    })

    if (success && !editingTask) {
      setTitle('')
      setDescription('')
      setPriority('Medium')
      setStatus('To Do')
      setDueDate('')
    }

    if (!success) {
      setError('Failed to save task.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 rounded-xl bg-white p-6 shadow-sm"
    >
      <h2 className="mb-5 text-xl font-semibold text-slate-900">
        {editingTask ? 'Edit Task' : 'Create New Task'}
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <TaskTextFields
          title={title}
          description={description}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
        />

        <TaskSelectFields
          priority={priority}
          status={status}
          onPriorityChange={setPriority}
          onStatusChange={setStatus}
        />

        <TaskDeadlineField
          dueDate={dueDate}
          onDueDateChange={setDueDate}
        />
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {saving
            ? 'Saving...'
            : editingTask
              ? 'Update Task'
              : 'Create Task'}
        </button>

        {editingTask && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-300 px-5 py-2"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default BusinessTaskForm
