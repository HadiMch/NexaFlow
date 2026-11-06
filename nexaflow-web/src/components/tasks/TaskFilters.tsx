import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";

import type { TaskPriority, TaskStatus } from "../../types/businessTask";

import type { TaskSort } from "../../hooks/tasks/useTaskFilters";

import Button from "../ui/Button";
import Input from "../ui/Input";

interface TaskFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: TaskStatus | "All";
  onStatusChange: (value: TaskStatus | "All") => void;
  priorityFilter: TaskPriority | "All";
  onPriorityChange: (value: TaskPriority | "All") => void;
  sortBy: TaskSort;
  onSortChange: (value: TaskSort) => void;
}

export default function TaskFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  sortBy,
  onSortChange,
}: TaskFiltersProps) {
  const hasActiveFilters =
    search.trim() !== "" ||
    statusFilter !== "All" ||
    priorityFilter !== "All" ||
    sortBy !== "newest";

  function resetFilters() {
    onSearchChange("");
    onStatusChange("All");
    onPriorityChange("All");
    onSortChange("newest");
  }

  const selectClass =
    "nf-input nf-motion min-h-11 w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none";

  return (
    <section className="nf-surface overflow-hidden">
      <div
        className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4"
        style={{ borderColor: "var(--nf-border)" }}
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal
            size={19}
            style={{ color: "var(--nf-primary-text)" }}
            aria-hidden="true"
          />

          <h2 className="nf-section-title">Search & Filters</h2>
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            icon={<RotateCcw size={15} />}
            onClick={resetFilters}
          >
            Reset Filters
          </Button>
        )}
      </div>

      <div className="space-y-5 p-5">
        <Input
          label="Search Tasks"
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by title or description..."
          leadingIcon={<Search size={17} />}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label
              htmlFor="task-status-filter"
              className="nf-text-secondary mb-1.5 block text-sm font-semibold"
            >
              Status
            </label>

            <select
              id="task-status-filter"
              value={statusFilter}
              onChange={(event) =>
                onStatusChange(event.target.value as TaskStatus | "All")
              }
              className={selectClass}
            >
              <option value="All">All Statuses</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="task-priority-filter"
              className="nf-text-secondary mb-1.5 block text-sm font-semibold"
            >
              Priority
            </label>

            <select
              id="task-priority-filter"
              value={priorityFilter}
              onChange={(event) =>
                onPriorityChange(event.target.value as TaskPriority | "All")
              }
              className={selectClass}
            >
              <option value="All">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="task-sort-filter"
              className="nf-text-secondary mb-1.5 block text-sm font-semibold"
            >
              Sort By
            </label>

            <select
              id="task-sort-filter"
              value={sortBy}
              onChange={(event) => onSortChange(event.target.value as TaskSort)}
              className={selectClass}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="dueSoon">Deadline (Earliest First)</option>
              <option value="priority">Priority (High to Low)</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
