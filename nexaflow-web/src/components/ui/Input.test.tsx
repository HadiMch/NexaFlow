import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "./Input";

describe("Input component", () => {
  it("renders an input with its label", () => {
    render(<Input label="Customer Name" />);

    expect(
      screen.getByRole("textbox", {
        name: "Customer Name",
      }),
    ).toBeInTheDocument();
  });

  it("supports typing into the input", async () => {
    const user = userEvent.setup();

    render(<Input label="Customer Name" />);

    const input = screen.getByRole("textbox");

    await user.type(input, "John Smith");

    expect(input).toHaveValue("John Smith");
  });

  it("supports placeholder text", () => {
    render(<Input placeholder="Enter customer email" />);

    expect(
      screen.getByPlaceholderText("Enter customer email"),
    ).toBeInTheDocument();
  });

  it("supports required inputs", () => {
    render(<Input label="Email" required />);

    expect(screen.getByRole("textbox")).toBeRequired();
  });

  it("displays validation errors", () => {
    render(<Input label="Email" error="Invalid email address" />);

    const input = screen.getByRole("textbox");
    const error = screen.getByRole("alert");

    expect(error).toHaveTextContent("Invalid email address");

    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("displays helper text", () => {
    render(<Input label="Password" helperText="Use at least 8 characters" />);

    expect(screen.getByText("Use at least 8 characters")).toBeInTheDocument();
  });

  it("connects helper text to the input", () => {
    render(
      <Input
        id="customer-email"
        label="Email"
        helperText="Enter a valid email"
      />,
    );

    expect(screen.getByRole("textbox")).toHaveAttribute(
      "aria-describedby",
      "customer-email-helper",
    );
  });

  it("connects errors to the input", () => {
    render(<Input id="customer-name" label="Name" error="Name is required" />);

    expect(screen.getByRole("textbox")).toHaveAttribute(
      "aria-describedby",
      "customer-name-error",
    );
  });

  it("supports disabled state", () => {
    render(<Input label="Email" disabled />);

    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("supports leading icons", () => {
    render(
      <Input
        label="Search"
        leadingIcon={<span data-testid="search-icon">🔍</span>}
      />,
    );

    expect(screen.getByTestId("search-icon")).toBeInTheDocument();
  });
});
