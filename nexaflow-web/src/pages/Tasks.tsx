import { RefreshCw } from "lucide-react";

import { useTaskWorkspace } from "../hooks/tasks/useTaskWorkspace";

import TaskHeader from "../components/tasks/TaskHeader";
import TaskStatsCards from "../components/tasks/TaskStatsCards";
import TaskFilters from "../components/tasks/TaskFilters";
import BusinessTaskTable from "../components/tasks/BusinessTaskTable";
import TaskDialogs from "../components/tasks/TaskDialogs";

import Button from "../components/ui/Button";
import Skeleton from "../components/ui/Skeleton";

export default function Tasks() {
  const workspace = useTaskWorkspace();

  return (
    <div className="nf-page space-y-6 pb-6">
      <TaskHeader
        totalCount={workspace.tasks.length}
        onAdd={workspace.openCreateForm}
      />

      {!workspace.loading && !workspace.error && (
        <TaskStatsCards tasks={workspace.tasks} />
      )}

      <TaskFilters
        search={workspace.search}
        onSearchChange={workspace.setSearch}
        statusFilter={workspace.statusFilter}
        onStatusChange={workspace.setStatusFilter}
        priorityFilter={workspace.priorityFilter}
        onPriorityChange={workspace.setPriorityFilter}
        sortBy={workspace.sortBy}
        onSortChange={workspace.setSortBy}
      />

      {!workspace.loading && !workspace.error && (
        <p className="nf-text-muted text-sm">
          Showing{" "}
          <span className="nf-text-primary font-semibold">
            {workspace.filteredTasks.length.toLocaleString()}
          </span>{" "}
          of{" "}
          <span className="nf-text-primary font-semibold">
            {workspace.tasks.length.toLocaleString()}
          </span>{" "}
          tasks
        </p>
      )}

      {workspace.loading ? (
        <div
          role="status"
          aria-label="Loading tasks"
          className="nf-surface space-y-4 p-5"
        >
          {Array.from({ length: 5 }, (_, index) => (
            <Skeleton key={index} className="h-14 w-full" />
          ))}
        </div>
      ) : workspace.error ? (
        <div className="nf-surface flex flex-col items-center gap-4 p-8 text-center">
          <p
            role="alert"
            className="text-sm"
            style={{ color: "var(--nf-danger)" }}
          >
            {workspace.error}
          </p>

          <Button
            variant="outline"
            icon={<RefreshCw size={16} />}
            onClick={workspace.refreshTasks}
          >
            Try Again
          </Button>
        </div>
      ) : (
        <BusinessTaskTable
          tasks={workspace.sortedTasks}
          deletingId={workspace.deletingId}
          onEdit={workspace.openEditForm}
          onDelete={workspace.openDeleteDialog}
        />
      )}

      <TaskDialogs
        formOpen={workspace.formOpen}
        editingTask={workspace.editingTask}
        taskToDelete={workspace.taskToDelete}
        discardOpen={workspace.discardOpen}
        saving={workspace.saving}
        deletingId={workspace.deletingId}
        onSubmit={workspace.handleSubmit}
        onDirtyChange={workspace.setFormDirty}
        onCloseForm={workspace.closeForm}
        onDiscard={workspace.discardForm}
        onCancelDiscard={workspace.closeDiscardDialog}
        onConfirmDelete={() => void workspace.confirmDelete()}
        onCancelDelete={workspace.closeDeleteDialog}
      />
    </div>
  );
}
