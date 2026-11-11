import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Badge from "./Badge";

describe("Badge component", () => {
  it("renders badge text", () => {
    render(<Badge>Active</Badge>);

    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("uses neutral variant by default", () => {
    render(<Badge>Pending</Badge>);

    expect(screen.getByText("Pending")).toHaveClass("nf-badge-neutral");
  });

  it.each(["primary", "success", "warning", "danger"] as const)(
    "supports the %s variant",
    (variant) => {
      render(<Badge variant={variant}>Status</Badge>);

      expect(screen.getByText("Status")).toHaveClass(`nf-badge-${variant}`);
    },
  );

  it("renders a status dot when enabled", () => {
    const { container } = render(
      <Badge variant="success" dot>
        Completed
      </Badge>,
    );

    const dot = container.querySelector(".nf-badge-dot");

    expect(dot).toBeInTheDocument();
    expect(dot).toHaveAttribute("aria-hidden", "true");
  });

  it("does not render a dot by default", () => {
    const { container } = render(<Badge>Active</Badge>);

    expect(container.querySelector(".nf-badge-dot")).not.toBeInTheDocument();
  });

  it("supports custom class names", () => {
    render(<Badge className="custom-badge">Custom</Badge>);

    expect(screen.getByText("Custom")).toHaveClass("custom-badge");
  });
});
