import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import type { Customer, CustomerInput } from "../../types/customer";

interface UseCustomerFormProps {
  editingCustomer: Customer | null;
  saving: boolean;
  onSubmit: (data: CustomerInput) => Promise<boolean>;
  onDirtyChange?: (dirty: boolean) => void;
}

type CustomerField = "name" | "email" | "phone";
type CustomerErrors = Partial<Record<CustomerField, string>>;

export function useCustomerForm({
  editingCustomer,
  saving,
  onSubmit,
  onDirtyChange,
}: UseCustomerFormProps) {
  const [name, setName] = useState(editingCustomer?.name ?? "");
  const [email, setEmail] = useState(editingCustomer?.email ?? "");
  const [phone, setPhone] = useState(editingCustomer?.phone ?? "");

  const [errors, setErrors] = useState<CustomerErrors>({});
  const [error, setError] = useState("");

  const initialName = editingCustomer?.name ?? "";
  const initialEmail = editingCustomer?.email ?? "";
  const initialPhone = editingCustomer?.phone ?? "";

  const dirty =
    name !== initialName || email !== initialEmail || phone !== initialPhone;

  useEffect(() => {
    onDirtyChange?.(dirty);
  }, [dirty, onDirtyChange]);

  function clearFieldError(field: CustomerField) {
    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
    setError("");
  }

  function changeName(value: string) {
    setName(value);
    clearFieldError("name");
  }

  function changeEmail(value: string) {
    setEmail(value);
    clearFieldError("email");
  }

  function changePhone(value: string) {
    setPhone(value);
    clearFieldError("phone");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;

    setError("");

    const nextErrors: CustomerErrors = {};
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName) {
      nextErrors.name = "Customer name is required.";
    } else if (trimmedName.length > 100) {
      nextErrors.name = "Maximum 100 characters.";
    }

    if (!trimmedEmail) {
      nextErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.email = "Enter a valid email address.";
    } else if (trimmedEmail.length > 255) {
      nextErrors.email = "Maximum 255 characters.";
    }

    if (trimmedPhone.length > 30) {
      nextErrors.phone = "Maximum 30 characters.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    try {
      await onSubmit({
        name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
      });
    } catch {
      setError("Unable to save customer. Please try again.");
    }
  }

  return {
    name,
    email,
    phone,
    errors,
    error,
    changeName,
    changeEmail,
    changePhone,
    handleSubmit,
  };
}
