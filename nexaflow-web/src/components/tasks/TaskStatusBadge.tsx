import type { TaskPriority, TaskStatus } from "../../types/businessTask";

import Badge from "../ui/Badge";

interface TaskStatusBadgeProps {
  value: TaskPriority | TaskStatus;
  variant: "priority" | "status";
}

type BadgeVariant = "neutral" | "primary" | "success" | "warning" | "danger";

function getBadgeVariant(
  value: TaskPriority | TaskStatus,
  variant: "priority" | "status",
): BadgeVariant {
  if (variant === "priority") {
    switch (value) {
      case "High":
        return "danger";
      case "Medium":
        return "warning";
      case "Low":
        return "success";
      default:
        return "neutral";
    }
  }

  switch (value) {
    case "Completed":
      return "success";
    case "In Progress":
      return "primary";
    case "To Do":
      return "neutral";
    default:
      return "neutral";
  }
}

export default function TaskStatusBadge({
  value,
  variant,
}: TaskStatusBadgeProps) {
  return <Badge variant={getBadgeVariant(value, variant)}>{value}</Badge>;
}
