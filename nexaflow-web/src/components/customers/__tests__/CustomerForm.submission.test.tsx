import { describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";

import {
  existingCustomer,
  getCustomerField,
  setupCustomerForm,
  submitCustomerForm,
} from "./customerFormTestUtils";

describe("CustomerForm submission", () => {
  it("submits valid customer data", async () => {
    const { user, onSubmit } = setupCustomerForm();

    await user.type(getCustomerField("Full Name"), "Sara Hasan");
    await user.type(getCustomerField("Email Address"), "sara@example.com");
    await user.type(getCustomerField("Phone Number"), "70123456");

    await user.click(
      screen.getByRole("button", {
        name: "Add Customer",
      }),
    );

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: "Sara Hasan",
        email: "sara@example.com",
        phone: "70123456",
      });
    });
  });

  it("trims whitespace before submission", async () => {
    const { user, onSubmit } = setupCustomerForm();

    await user.type(getCustomerField("Full Name"), "  Sara Hasan  ");
    await user.type(getCustomerField("Email Address"), "  sara@example.com  ");

    submitCustomerForm();

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: "Sara Hasan",
        email: "sara@example.com",
        phone: "",
      });
    });
  });

  it("accepts an empty phone number", async () => {
    const { user, onSubmit } = setupCustomerForm();

    await user.type(getCustomerField("Full Name"), "John Smith");
    await user.type(getCustomerField("Email Address"), "john@example.com");

    await user.click(
      screen.getByRole("button", {
        name: "Add Customer",
      }),
    );

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ phone: "" }),
      );
    });
  });

  it("submits updated customer information", async () => {
    const { user, onSubmit } = setupCustomerForm({
      editingCustomer: existingCustomer,
    });

    const name = getCustomerField("Full Name");
    await user.clear(name);
    await user.type(name, "John Updated");

    await user.click(
      screen.getByRole("button", {
        name: "Save Changes",
      }),
    );

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: "John Updated",
        email: "john@example.com",
        phone: "70123456",
      });
    });
  });

  it("shows an error when submission throws", async () => {
    const onSubmit = vi.fn().mockRejectedValue(new Error("Network error"));
    const { user } = setupCustomerForm({ onSubmit });

    await user.type(getCustomerField("Full Name"), "John Smith");
    await user.type(getCustomerField("Email Address"), "john@example.com");

    await user.click(
      screen.getByRole("button", {
        name: "Add Customer",
      }),
    );

    expect(
      await screen.findByText("Unable to save customer. Please try again."),
    ).toBeInTheDocument();
  });
});
