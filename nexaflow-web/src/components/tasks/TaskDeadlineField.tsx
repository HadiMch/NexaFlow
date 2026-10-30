
interface TaskDeadlineFieldProps {
  dueDate: string
  onDueDateChange: (value: string) => void
}

function TaskDeadlineField({
  dueDate,
  onDueDateChange,
}: TaskDeadlineFieldProps) {
  return (
    <div className="md:col-span-2">
      <label
        htmlFor="task-due-date"
        className="mb-1 block text-sm font-medium text-slate-700"
      >
        Deadline (Optional)
      </label>

      <input
        id="task-due-date"
        type="datetime-local"
        value={dueDate}
        onChange={(e) => onDueDateChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 p-3"
      />
    </div>
  )
}

export default TaskDeadlineField
