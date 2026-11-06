import { useState } from "react";

import { useBusinessTasks } from "./useBusinessTasks";
import { useTaskFilters } from "./useTaskFilters";
import { useToast } from "../useToast";

import type {
  BusinessTask,
  CreateBusinessTaskInput,
} from "../../types/businessTask";

export function useTaskWorkspace() {
  const data = useBusinessTasks();
  const filters = useTaskFilters(data.tasks);
  const { showToast } = useToast();

  const [formOpen, setFormOpen] = useState(false);

  const [editingTask, setEditingTask] = useState<BusinessTask | null>(null);

  const [taskToDelete, setTaskToDelete] = useState<BusinessTask | null>(null);

  const [formDirty, setFormDirty] = useState(false);
  const [discardOpen, setDiscardOpen] = useState(false);

  function openCreateForm() {
    setEditingTask(null);
    setFormDirty(false);
    setFormOpen(true);
  }

  function openEditForm(task: BusinessTask) {
    setEditingTask(task);
    setFormDirty(false);
    setFormOpen(true);
  }

  function discardForm() {
    setDiscardOpen(false);
    setFormOpen(false);
    setEditingTask(null);
    setFormDirty(false);
  }

  function closeForm() {
    if (data.saving) return;

    if (formDirty) {
      setDiscardOpen(true);
      return;
    }

    discardForm();
  }

  async function handleSubmit(
    input: CreateBusinessTaskInput,
  ): Promise<boolean> {
    try {
      const editing = editingTask !== null;

      const success = editingTask
        ? await data.updateTask(editingTask.id, input)
        : await data.addTask(input);

      if (success) {
        discardForm();

        showToast(
          editing ? "Task updated successfully." : "Task created successfully.",
          "success",
        );
      } else {
        showToast("Unable to save task. Please try again.", "error");
      }

      return success;
    } catch {
      showToast("Unable to save task.", "error");
      return false;
    }
  }

  function openDeleteDialog(id: number) {
    const task = data.tasks.find((item) => item.id === id);

    if (task) {
      setTaskToDelete(task);
    }
  }

  function closeDeleteDialog() {
    if (data.deletingId !== null) return;
    setTaskToDelete(null);
  }

  async function confirmDelete() {
    if (!taskToDelete || data.deletingId !== null) {
      return;
    }

    const id = taskToDelete.id;

    try {
      const success = await data.deleteTask(id);

      if (success) {
        if (editingTask?.id === id) {
          discardForm();
        }

        showToast("Task deleted successfully.", "success");
      } else {
        showToast("Unable to delete task.", "error");
      }
    } catch {
      showToast("Unable to delete task.", "error");
    } finally {
      setTaskToDelete(null);
    }
  }

  return {
    ...data,
    ...filters,
    formOpen,
    editingTask,
    taskToDelete,
    formDirty,
    setFormDirty,
    discardOpen,
    openCreateForm,
    openEditForm,
    closeForm,
    discardForm,
    closeDiscardDialog: () => setDiscardOpen(false),
    handleSubmit,
    openDeleteDialog,
    closeDeleteDialog,
    confirmDelete,
  };
}
