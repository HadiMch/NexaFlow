import { ListTodo, Plus } from "lucide-react";

import Button from "../ui/Button";

interface TaskHeaderProps {
  totalCount: number;
  onAdd: () => void;
}

export default function TaskHeader({ totalCount, onAdd }: TaskHeaderProps) {
  return (
    <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p
          className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
          style={{ color: "var(--nf-primary-text)" }}
        >
          <ListTodo size={15} aria-hidden="true" />
          Operations / Tasks
        </p>

        <h1 className="nf-page-title">Task Management</h1>

        <p className="nf-page-subtitle mt-2">
          Organize work, manage priorities, and track progress across your
          business.
        </p>

        <p className="nf-text-muted mt-3 text-xs">
          {totalCount.toLocaleString()} {totalCount === 1 ? "task" : "tasks"} in
          your workspace
        </p>
      </div>

      <Button icon={<Plus size={18} />} onClick={onAdd}>
        Create Task
      </Button>
    </header>
  );
}
