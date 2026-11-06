import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import type {
  BusinessTask,
  CreateBusinessTaskInput,
  TaskPriority,
  TaskStatus,
} from "../../types/businessTask";

import { toLocalTaskDate, toTaskIsoDate } from "../../utils/tasks/taskDates";

interface UseBusinessTaskFormProps {
  editingTask: BusinessTask | null;
  saving: boolean;
  onSubmit: (data: CreateBusinessTaskInput) => Promise<boolean>;
  onDirtyChange?: (dirty: boolean) => void;
}

type TaskErrors = Partial<Record<"title" | "description" | "dueDate", string>>;

export function useBusinessTaskForm({
  editingTask,
  saving,
  onSubmit,
  onDirtyChange,
}: UseBusinessTaskFormProps) {
  const initialTitle = editingTask?.title ?? "";
  const initialDescription = editingTask?.description ?? "";
  const initialPriority = editingTask?.priority ?? "Medium";
  const initialStatus = editingTask?.status ?? "To Do";
  const initialDueDate = toLocalTaskDate(editingTask?.dueDate ?? null);

  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const [priority, setPriority] = useState<TaskPriority>(initialPriority);

  const [status, setStatus] = useState<TaskStatus>(initialStatus);

  const [dueDate, setDueDate] = useState(initialDueDate);

  const [errors, setErrors] = useState<TaskErrors>({});
  const [error, setError] = useState("");

  const dirty =
    title !== initialTitle ||
    description !== initialDescription ||
    priority !== initialPriority ||
    status !== initialStatus ||
    dueDate !== initialDueDate;

  useEffect(() => {
    onDirtyChange?.(dirty);
  }, [dirty, onDirtyChange]);

  function changeTitle(value: string) {
    setTitle(value);
    setErrors((previous) => ({
      ...previous,
      title: undefined,
    }));
  }

  function changeDescription(value: string) {
    setDescription(value);
    setErrors((previous) => ({
      ...previous,
      description: undefined,
    }));
  }

  function changeDueDate(value: string) {
    setDueDate(value);
    setErrors((previous) => ({
      ...previous,
      dueDate: undefined,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (saving) return;

    setError("");

    const nextErrors: TaskErrors = {};
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) {
      nextErrors.title = "Task title is required.";
    } else if (trimmedTitle.length > 150) {
      nextErrors.title = "Maximum 150 characters.";
    }

    if (trimmedDescription.length > 2000) {
      nextErrors.description = "Maximum 2,000 characters.";
    }

    let dueDateIso: string | null = null;

    try {
      dueDateIso = toTaskIsoDate(dueDate);
    } catch {
      nextErrors.dueDate = "Enter a valid deadline.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const input: CreateBusinessTaskInput = {
      title: trimmedTitle,
      description: trimmedDescription || null,
      priority,
      status,
      dueDate: dueDateIso,
    };

    try {
      const success = await onSubmit(input);

      if (!success) {
        setError("Unable to save task. Please try again.");
      }
    } catch {
      setError("Unable to save task. Please try again.");
    }
  }

  return {
    title,
    description,
    priority,
    status,
    dueDate,
    errors,
    error,
    changeTitle,
    changeDescription,
    changeDueDate,
    setPriority,
    setStatus,
    handleSubmit,
  };
}
