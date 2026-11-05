import { Save, UserPlus } from "lucide-react";

import type { Customer, CustomerInput } from "../../types/customer";
import { useCustomerForm } from "../../hooks/customers/useCustomerForm";

import Button from "../ui/Button";
import Input from "../ui/Input";

interface CustomerFormProps {
  editingCustomer: Customer | null;
  saving: boolean;
  onSubmit: (data: CustomerInput) => Promise<boolean>;
  onCancel: () => void;
  onDirtyChange?: (dirty: boolean) => void;
}

export default function CustomerForm({
  editingCustomer,
  saving,
  onSubmit,
  onCancel,
  onDirtyChange,
}: CustomerFormProps) {
  const form = useCustomerForm({
    editingCustomer,
    saving,
    onSubmit,
    onDirtyChange,
  });

  return (
    <form
      onSubmit={(event) => void form.handleSubmit(event)}
      className="space-y-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Input
            label="Full Name"
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Enter customer name"
            value={form.name}
            onChange={(event) => form.changeName(event.target.value)}
            error={form.errors.name}
            required
            maxLength={100}
            disabled={saving}
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="customer@example.com"
          value={form.email}
          onChange={(event) => form.changeEmail(event.target.value)}
          error={form.errors.email}
          required
          maxLength={255}
          disabled={saving}
        />

        <Input
          label="Phone Number"
          type="tel"
          name="phone"
          autoComplete="tel"
          placeholder="Enter phone number"
          value={form.phone}
          onChange={(event) => form.changePhone(event.target.value)}
          error={form.errors.phone}
          maxLength={30}
          disabled={saving}
          helperText="Optional contact number"
        />
      </div>

      {form.error && (
        <p
          role="alert"
          className="rounded-xl p-3 text-sm"
          style={{
            background: "var(--nf-danger-soft)",
            color: "var(--nf-danger)",
          }}
        >
          {form.error}
        </p>
      )}

      <div
        className="flex flex-wrap justify-end gap-3 border-t pt-5"
        style={{ borderColor: "var(--nf-border)" }}
      >
        <Button variant="outline" disabled={saving} onClick={onCancel}>
          Cancel
        </Button>

        <Button
          type="submit"
          loading={saving}
          icon={editingCustomer ? <Save size={17} /> : <UserPlus size={17} />}
        >
          {editingCustomer ? "Save Changes" : "Add Customer"}
        </Button>
      </div>
    </form>
  );
}
