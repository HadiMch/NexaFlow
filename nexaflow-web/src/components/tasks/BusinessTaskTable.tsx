import { ClipboardList, ListTodo } from "lucide-react";
import { useId } from "react";

import type { BusinessTask } from "../../types/businessTask";

import { useCurrentTime } from "../../hooks/useCurrentTime";

import BusinessTaskRow from "./BusinessTaskRow";
import BusinessTaskMobileList from "./BusinessTaskMobileList";

interface BusinessTaskTableProps {
  tasks: BusinessTask[];
  deletingId: number | null;
  onEdit: (task: BusinessTask) => void;
  onDelete: (id: number) => void;
}

export default function BusinessTaskTable({
  tasks,
  deletingId,
  onEdit,
  onDelete,
}: BusinessTaskTableProps) {
  const currentTime = useCurrentTime();
  const headingId = useId();

  const actions = {
    deletingId,
    onEdit,
    onDelete,
  };

  return (
    <section className="nf-surface overflow-hidden" aria-labelledby={headingId}>
      <div
        className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4"
        style={{ borderColor: "var(--nf-border)" }}
      >
        <div>
          <h2
            id={headingId}
            className="nf-section-title flex items-center gap-2"
          >
            <ListTodo
              size={20}
              style={{ color: "var(--nf-primary-text)" }}
              aria-hidden="true"
            />
            Task Directory
          </h2>

          <p className="nf-section-description">
            Manage business tasks and deadlines.
          </p>
        </div>

        <span
          className="rounded-lg px-3 py-1.5 text-xs font-semibold"
          style={{
            color: "var(--nf-primary-text)",
            background: "var(--nf-primary-soft)",
          }}
        >
          {tasks.length.toLocaleString()}{" "}
          {tasks.length === 1 ? "task" : "tasks"}
        </span>
      </div>

      {tasks.length === 0 ? (
        <div className="flex flex-col items-center px-6 py-14 text-center">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{
              background: "var(--nf-primary-soft)",
              color: "var(--nf-primary-text)",
            }}
          >
            <ClipboardList size={26} aria-hidden="true" />
          </div>

          <h3 className="nf-text-primary mt-4 font-bold">No matching tasks</h3>

          <p className="nf-text-muted mt-2 max-w-sm text-center text-sm leading-6">
            Adjust your filters or create a new task.
          </p>
        </div>
      ) : (
        <>
          <BusinessTaskMobileList
            tasks={tasks}
            currentTime={currentTime}
            {...actions}
          />

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[780px] text-left text-sm">
              <thead
                style={{
                  color: "var(--nf-text-muted)",
                  background: "var(--nf-surface-muted)",
                }}
              >
                <tr>
                  <th scope="col" className="px-4 py-4">
                    Task
                  </th>
                  <th scope="col" className="px-4 py-4">
                    Priority
                  </th>
                  <th scope="col" className="px-4 py-4">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-4">
                    Deadline
                  </th>
                  <th scope="col" className="px-4 py-4">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {tasks.map((task) => (
                  <BusinessTaskRow
                    key={task.id}
                    task={task}
                    currentTime={currentTime}
                    {...actions}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}
