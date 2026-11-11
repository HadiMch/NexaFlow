import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import CustomerForm from "../CustomerForm";
import type { Customer, CustomerInput } from "../../../types/customer";

export const existingCustomer: Customer = {
  id: 1,
  name: "John Smith",
  email: "john@example.com",
  phone: "70123456",
  createdAt: "2026-11-01T10:00:00Z",
};

interface SetupOptions {
  editingCustomer?: Customer | null;
  saving?: boolean;
  onSubmit?: (data: CustomerInput) => Promise<boolean>;
  onCancel?: () => void;
  onDirtyChange?: (dirty: boolean) => void;
}

export function setupCustomerForm(options: SetupOptions = {}) {
  const onSubmit = options.onSubmit ?? vi.fn().mockResolvedValue(true);
  const onCancel = options.onCancel ?? vi.fn();

  const result = render(
    <CustomerForm
      editingCustomer={options.editingCustomer ?? null}
      saving={options.saving ?? false}
      onSubmit={onSubmit}
      onCancel={onCancel}
      onDirtyChange={options.onDirtyChange}
    />,
  );

  return {
    ...result,
    onSubmit,
    onCancel,
    user: userEvent.setup(),
  };
}

export function getCustomerField(
  name: "Full Name" | "Email Address" | "Phone Number",
) {
  return screen.getByRole("textbox", {
    name: new RegExp(`^${name}\\s*\\*?$`),
  });
}

export function submitCustomerForm() {
  const button = screen.getByRole("button", {
    name: /add customer|save changes/i,
  });

  const form = button.closest("form");

  if (!form) {
    throw new Error("Customer form not found");
  }

  fireEvent.submit(form);
}
