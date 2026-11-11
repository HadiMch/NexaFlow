import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import TaskStatusBadge from "./TaskStatusBadge";

describe("TaskStatusBadge", () => {
  it.each([
    ["High", "danger"],
    ["Medium", "warning"],
    ["Low", "success"],
  ] as const)("renders %s priority using %s", (value, expectedVariant) => {
    render(<TaskStatusBadge value={value} variant="priority" />);

    expect(screen.getByText(value)).toHaveClass(`nf-badge-${expectedVariant}`);
  });

  it.each([
    ["Completed", "success"],
    ["In Progress", "primary"],
    ["To Do", "neutral"],
  ] as const)("renders %s status using %s", (value, expectedVariant) => {
    render(<TaskStatusBadge value={value} variant="status" />);

    expect(screen.getByText(value)).toHaveClass(`nf-badge-${expectedVariant}`);
  });
});
