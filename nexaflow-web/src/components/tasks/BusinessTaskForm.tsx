import { Plus, Save } from "lucide-react";

import type {
  BusinessTask,
  CreateBusinessTaskInput,
} from "../../types/businessTask";

import { useBusinessTaskForm } from "../../hooks/tasks/useBusinessTaskForm";

import Button from "../ui/Button";
import TaskTextFields from "./TaskTextFields";
import TaskSelectFields from "./TaskSelectFields";
import TaskDeadlineField from "./TaskDeadlineField";

interface BusinessTaskFormProps {
  editingTask: BusinessTask | null;
  saving: boolean;
  onSubmit: (data: CreateBusinessTaskInput) => Promise<boolean>;
  onCancel: () => void;
  onDirtyChange?: (dirty: boolean) => void;
}

export default function BusinessTaskForm({
  editingTask,
  saving,
  onSubmit,
  onCancel,
  onDirtyChange,
}: BusinessTaskFormProps) {
  const form = useBusinessTaskForm({
    editingTask,
    saving,
    onSubmit,
    onDirtyChange,
  });

  return (
    <form
      onSubmit={(event) => void form.handleSubmit(event)}
      className="space-y-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <TaskTextFields
          title={form.title}
          description={form.description}
          saving={saving}
          titleError={form.errors.title}
          descriptionError={form.errors.description}
          onTitleChange={form.changeTitle}
          onDescriptionChange={form.changeDescription}
        />

        <TaskSelectFields
          priority={form.priority}
          status={form.status}
          saving={saving}
          onPriorityChange={form.setPriority}
          onStatusChange={form.setStatus}
        />

        <TaskDeadlineField
          dueDate={form.dueDate}
          saving={saving}
          error={form.errors.dueDate}
          onDueDateChange={form.changeDueDate}
        />
      </div>

      {form.error && (
        <p
          role="alert"
          className="rounded-xl p-3 text-sm"
          style={{
            color: "var(--nf-danger)",
            background: "var(--nf-danger-soft)",
          }}
        >
          {form.error}
        </p>
      )}

      <div
        className="flex flex-wrap justify-end gap-3 border-t pt-5"
        style={{ borderColor: "var(--nf-border)" }}
      >
        <Button variant="outline" disabled={saving} onClick={onCancel}>
          Cancel
        </Button>

        <Button
          type="submit"
          loading={saving}
          icon={editingTask ? <Save size={17} /> : <Plus size={17} />}
        >
          {editingTask ? "Save Changes" : "Create Task"}
        </Button>
      </div>
    </form>
  );
}
