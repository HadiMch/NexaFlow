import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button component", () => {
  it("renders its text correctly", () => {
    render(<Button>Save Customer</Button>);

    expect(
      screen.getByRole("button", { name: "Save Customer" }),
    ).toBeInTheDocument();
  });

  it("uses the primary variant by default", () => {
    render(<Button>Save</Button>);

    expect(screen.getByRole("button")).toHaveClass("nf-button-primary");
  });

  it("supports different variants and sizes", () => {
    render(
      <Button variant="danger" size="lg">
        Delete
      </Button>,
    );

    const button = screen.getByRole("button");

    expect(button).toHaveClass("nf-button-danger");
    expect(button).toHaveClass("min-h-12");
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Add Customer</Button>);

    await user.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("prevents clicks when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Button disabled onClick={handleClick}>
        Delete
      </Button>,
    );

    const button = screen.getByRole("button");

    expect(button).toBeDisabled();

    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("disables the button while loading", () => {
    render(<Button loading>Saving...</Button>);

    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveTextContent("Saving...");
  });

  it("renders an icon when not loading", () => {
    render(
      <Button icon={<span data-testid="button-icon">+</span>}>Add</Button>,
    );

    expect(screen.getByTestId("button-icon")).toBeInTheDocument();
  });

  it("defaults to button type", () => {
    render(<Button>Submit</Button>);

    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });
});
