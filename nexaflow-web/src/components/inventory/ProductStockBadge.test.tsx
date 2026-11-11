import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductStockBadge from "./ProductStockBadge";

describe("ProductStockBadge", () => {
  it("shows out of stock when quantity is zero", () => {
    render(<ProductStockBadge quantity={0} />);

    expect(screen.getByText("Out of Stock")).toHaveClass("nf-badge-danger");
  });

  it("shows low stock when quantity is one", () => {
    render(<ProductStockBadge quantity={1} />);

    expect(screen.getByText("Low Stock (1)")).toHaveClass("nf-badge-warning");
  });

  it("shows low stock at the threshold of five", () => {
    render(<ProductStockBadge quantity={5} />);

    expect(screen.getByText("Low Stock (5)")).toHaveClass("nf-badge-warning");
  });

  it("shows in stock when quantity is six", () => {
    render(<ProductStockBadge quantity={6} />);

    expect(screen.getByText("In Stock (6)")).toHaveClass("nf-badge-success");
  });

  it("shows in stock for large quantities", () => {
    render(<ProductStockBadge quantity={100} />);

    expect(screen.getByText("In Stock (100)")).toHaveClass("nf-badge-success");
  });
});
