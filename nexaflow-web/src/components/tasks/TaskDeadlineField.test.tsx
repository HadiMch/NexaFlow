import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskDeadlineField from "./TaskDeadlineField";

describe("TaskDeadlineField", () => {
  it("renders the optional deadline field", () => {
    render(
      <TaskDeadlineField dueDate="" saving={false} onDueDateChange={vi.fn()} />,
    );

    const input = screen.getByLabelText("Deadline (Optional)");

    expect(input).toHaveAttribute("type", "datetime-local");
    expect(input).not.toBeRequired();
  });

  it("displays an existing deadline", () => {
    render(
      <TaskDeadlineField
        dueDate="2026-11-20T14:30"
        saving={false}
        onDueDateChange={vi.fn()}
      />,
    );

    expect(screen.getByLabelText("Deadline (Optional)")).toHaveValue(
      "2026-11-20T14:30",
    );
  });

  it("calls the change handler when edited", () => {
    const handleChange = vi.fn();

    render(
      <TaskDeadlineField
        dueDate=""
        saving={false}
        onDueDateChange={handleChange}
      />,
    );

    fireEvent.change(screen.getByLabelText("Deadline (Optional)"), {
      target: {
        value: "2026-11-25T10:00",
      },
    });

    expect(handleChange).toHaveBeenCalledWith("2026-11-25T10:00");
  });

  it("disables the field while saving", () => {
    render(<TaskDeadlineField dueDate="" saving onDueDateChange={vi.fn()} />);

    expect(screen.getByLabelText("Deadline (Optional)")).toBeDisabled();
  });

  it("displays validation errors", () => {
    render(
      <TaskDeadlineField
        dueDate=""
        saving={false}
        error="Invalid deadline"
        onDueDateChange={vi.fn()}
      />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Invalid deadline");

    expect(screen.getByLabelText("Deadline (Optional)")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });
});
