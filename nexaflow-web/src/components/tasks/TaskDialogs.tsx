import type {
  BusinessTask,
  CreateBusinessTaskInput,
} from "../../types/businessTask";

import Modal from "../ui/Modal";
import ConfirmDialog from "../ui/ConfirmDialog";

import BusinessTaskForm from "./BusinessTaskForm";

interface TaskDialogsProps {
  formOpen: boolean;
  editingTask: BusinessTask | null;
  taskToDelete: BusinessTask | null;
  discardOpen: boolean;
  saving: boolean;
  deletingId: number | null;
  onSubmit: (data: CreateBusinessTaskInput) => Promise<boolean>;
  onDirtyChange: (dirty: boolean) => void;
  onCloseForm: () => void;
  onDiscard: () => void;
  onCancelDiscard: () => void;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
}

export default function TaskDialogs({
  formOpen,
  editingTask,
  taskToDelete,
  discardOpen,
  saving,
  deletingId,
  onSubmit,
  onDirtyChange,
  onCloseForm,
  onDiscard,
  onCancelDiscard,
  onConfirmDelete,
  onCancelDelete,
}: TaskDialogsProps) {
  return (
    <>
      <Modal
        open={formOpen}
        title={editingTask ? "Edit Task" : "Create New Task"}
        description={
          editingTask
            ? "Update task details, priority, status, and deadline."
            : "Plan and organize a new business task."
        }
        size="lg"
        disableClose={saving}
        onClose={onCloseForm}
      >
        <BusinessTaskForm
          key={editingTask?.id ?? "new"}
          editingTask={editingTask}
          saving={saving}
          onSubmit={onSubmit}
          onCancel={onCloseForm}
          onDirtyChange={onDirtyChange}
        />
      </Modal>

      <ConfirmDialog
        open={discardOpen}
        title="Discard Task Changes?"
        description="Your unsaved task information will be lost."
        confirmLabel="Discard Changes"
        onConfirm={onDiscard}
        onCancel={onCancelDiscard}
      />

      <ConfirmDialog
        open={taskToDelete !== null}
        title="Delete Task"
        description={
          taskToDelete
            ? `Are you sure you want to delete "${taskToDelete.title}"? This action cannot be undone.`
            : ""
        }
        confirmLabel="Delete Task"
        loading={deletingId !== null}
        onConfirm={onConfirmDelete}
        onCancel={onCancelDelete}
      />
    </>
  );
}
