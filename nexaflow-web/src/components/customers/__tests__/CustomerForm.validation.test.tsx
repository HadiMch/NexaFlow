import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";

import {
  getCustomerField,
  setupCustomerForm,
  submitCustomerForm,
} from "./customerFormTestUtils";

describe("CustomerForm validation", () => {
  it("renders creation fields", () => {
    setupCustomerForm();

    expect(getCustomerField("Full Name")).toBeInTheDocument();
    expect(getCustomerField("Email Address")).toBeInTheDocument();
    expect(getCustomerField("Phone Number")).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Add Customer",
      }),
    ).toBeInTheDocument();
  });

  it("rejects empty required fields", async () => {
    const { onSubmit } = setupCustomerForm();

    submitCustomerForm();

    expect(
      await screen.findByText("Customer name is required."),
    ).toBeInTheDocument();

    expect(screen.getByText("Email address is required.")).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("rejects invalid email addresses", async () => {
    const { user, onSubmit } = setupCustomerForm();

    await user.type(getCustomerField("Full Name"), "John Smith");
    await user.type(getCustomerField("Email Address"), "invalid-email");

    submitCustomerForm();

    expect(
      await screen.findByText("Enter a valid email address."),
    ).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalled();
  });
});
