import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import type {
  CustomerActivity,
  CustomerActivityType,
  UpdateCustomerActivityInput,
} from "../../types/customerActivity";

import {
  toIsoDateTime,
  toLocalDateTime,
} from "../../utils/customerActivities/activityDates";

interface UseCustomerActivityFormProps {
  editingActivity: CustomerActivity | null;
  saving: boolean;
  onSubmit: (data: UpdateCustomerActivityInput) => Promise<boolean>;
  onDirtyChange?: (dirty: boolean) => void;
}

export function useCustomerActivityForm({
  editingActivity,
  saving,
  onSubmit,
  onDirtyChange,
}: UseCustomerActivityFormProps) {
  const initialType = editingActivity?.type ?? "Call";
  const initialDescription = editingActivity?.description ?? "";
  const initialFollowUp = toLocalDateTime(editingActivity?.followUpDate);

  const [type, setType] = useState<CustomerActivityType>(initialType);

  const [description, setDescription] = useState(initialDescription);

  const [followUpDate, setFollowUpDate] = useState(initialFollowUp);

  const [error, setError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [dateError, setDateError] = useState("");

  const dirty =
    type !== initialType ||
    description !== initialDescription ||
    followUpDate !== initialFollowUp;

  useEffect(() => {
    onDirtyChange?.(dirty);
  }, [dirty, onDirtyChange]);

  function changeDescription(value: string) {
    setDescription(value);
    setDescriptionError("");
    setError("");
  }

  function changeFollowUpDate(value: string) {
    setFollowUpDate(value);
    setDateError("");
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;

    setError("");
    setDescriptionError("");
    setDateError("");

    const trimmed = description.trim();

    if (!trimmed) {
      setDescriptionError("Description is required.");
      return;
    }

    if (trimmed.length > 1000) {
      setDescriptionError("Maximum 1,000 characters.");
      return;
    }

    let followUpIso: string | null;

    try {
      followUpIso = toIsoDateTime(followUpDate);
    } catch {
      setDateError("Enter a valid follow-up date.");
      return;
    }

    try {
      const success = await onSubmit({
        type,
        description: trimmed,
        followUpDate: followUpIso,
      });

      if (!success) {
        setError("Unable to save activity. Please try again.");
        return;
      }

      if (!editingActivity) {
        setType("Call");
        setDescription("");
        setFollowUpDate("");
      }
    } catch {
      setError("Unable to save activity. Please try again.");
    }
  }

  return {
    type,
    setType,
    description,
    followUpDate,
    error,
    descriptionError,
    dateError,
    changeDescription,
    changeFollowUpDate,
    handleSubmit,
  };
}
