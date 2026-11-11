import { describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";

import {
  existingCustomer,
  getCustomerField,
  setupCustomerForm,
} from "./customerFormTestUtils";

describe("CustomerForm behavior", () => {
  it("loads existing customer data when editing", () => {
    setupCustomerForm({ editingCustomer: existingCustomer });

    expect(getCustomerField("Full Name")).toHaveValue("John Smith");
    expect(getCustomerField("Email Address")).toHaveValue("john@example.com");
    expect(getCustomerField("Phone Number")).toHaveValue("70123456");
    expect(
      screen.getByRole("button", {
        name: "Save Changes",
      }),
    ).toBeInTheDocument();
  });

  it("calls onCancel when cancelled", async () => {
    const { user, onCancel } = setupCustomerForm();

    await user.click(
      screen.getByRole("button", {
        name: "Cancel",
      }),
    );

    expect(onCancel).toHaveBeenCalledOnce();
  });

  it("disables controls while saving", () => {
    setupCustomerForm({ saving: true });

    expect(getCustomerField("Full Name")).toBeDisabled();
    expect(getCustomerField("Email Address")).toBeDisabled();
    expect(
      screen.getByRole("button", {
        name: "Cancel",
      }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", {
        name: "Add Customer",
      }),
    ).toBeDisabled();
  });

  it("reports form dirty state changes", async () => {
    const onDirtyChange = vi.fn();
    const { user } = setupCustomerForm({ onDirtyChange });

    await waitFor(() => {
      expect(onDirtyChange).toHaveBeenCalledWith(false);
    });

    await user.type(getCustomerField("Full Name"), "John");

    await waitFor(() => {
      expect(onDirtyChange).toHaveBeenCalledWith(true);
    });
  });
});
