
interface TaskTextFieldsProps {
  title: string
  description: string
  onTitleChange: (value: string) => void
  onDescriptionChange: (value: string) => void
}

function TaskTextFields({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}: TaskTextFieldsProps) {
  return (
    <>
      <div className="md:col-span-2">
        <label
          htmlFor="task-title"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Task Title
        </label>

        <input
          id="task-title"
          type="text"
          required
          maxLength={150}
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Enter task title..."
          className="w-full rounded-lg border border-slate-300 p-3"
        />
      </div>

      <div className="md:col-span-2">
        <label
          htmlFor="task-description"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Description (Optional)
        </label>

        <textarea
          id="task-description"
          rows={3}
          maxLength={2000}
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Describe the task..."
          className="w-full rounded-lg border border-slate-300 p-3"
        />
      </div>
    </>
  )
}

export default TaskTextFields