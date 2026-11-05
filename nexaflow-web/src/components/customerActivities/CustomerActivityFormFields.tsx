import { CalendarClock } from "lucide-react";

import type { CustomerActivityType } from "../../types/customerActivity";
import Input from "../ui/Input";

interface CustomerActivityFormFieldsProps {
  formId: string;
  type: CustomerActivityType;
  description: string;
  followUpDate: string;
  saving: boolean;
  descriptionError?: string;
  dateError?: string;
  onTypeChange: (value: CustomerActivityType) => void;
  onDescriptionChange: (value: string) => void;
  onFollowUpDateChange: (value: string) => void;
}

const activityTypes: CustomerActivityType[] = [
  "Call",
  "Email",
  "Meeting",
  "Note",
];

export default function CustomerActivityFormFields({
  formId,
  type,
  description,
  followUpDate,
  saving,
  descriptionError,
  dateError,
  onTypeChange,
  onDescriptionChange,
  onFollowUpDateChange,
}: CustomerActivityFormFieldsProps) {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label
            htmlFor={`${formId}-type`}
            className="nf-text-secondary mb-1.5 block text-sm font-semibold"
          >
            Activity Type
          </label>

          <select
            id={`${formId}-type`}
            value={type}
            disabled={saving}
            onChange={(event) =>
              onTypeChange(event.target.value as CustomerActivityType)
            }
            className="nf-input nf-motion min-h-11 w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none"
          >
            {activityTypes.map((activityType) => (
              <option key={activityType} value={activityType}>
                {activityType}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Follow-up Date"
          type="datetime-local"
          leadingIcon={<CalendarClock size={17} />}
          value={followUpDate}
          onChange={(event) => onFollowUpDateChange(event.target.value)}
          disabled={saving}
          error={dateError}
          helperText="Optional date for future contact"
        />
      </div>

      <div>
        <label
          htmlFor={`${formId}-description`}
          className="nf-text-secondary mb-1.5 block text-sm font-semibold"
        >
          Description *
        </label>

        <textarea
          id={`${formId}-description`}
          rows={4}
          required
          maxLength={1000}
          disabled={saving}
          value={description}
          onChange={(event) => onDescriptionChange(event.target.value)}
          placeholder="Describe the customer interaction..."
          aria-invalid={Boolean(descriptionError)}
          aria-describedby={
            descriptionError
              ? `${formId}-description-error`
              : `${formId}-character-count`
          }
          className={`nf-input nf-motion w-full resize-y rounded-xl border px-4 py-3 text-sm leading-6 outline-none ${
            descriptionError ? "nf-input-error" : ""
          }`}
        />

        {descriptionError && (
          <p
            id={`${formId}-description-error`}
            role="alert"
            className="mt-1 text-xs"
            style={{ color: "var(--nf-danger)" }}
          >
            {descriptionError}
          </p>
        )}

        <p
          id={`${formId}-character-count`}
          className="nf-text-muted mt-1 text-right text-xs"
        >
          {description.length.toLocaleString()} / 1,000
        </p>
      </div>
    </div>
  );
}
