import { useId } from "react";

import Input from "../ui/Input";

interface TaskTextFieldsProps {
  title: string;
  description: string;
  saving: boolean;
  titleError?: string;
  descriptionError?: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

export default function TaskTextFields({
  title,
  description,
  saving,
  titleError,
  descriptionError,
  onTitleChange,
  onDescriptionChange,
}: TaskTextFieldsProps) {
  const id = useId();

  return (
    <>
      <div className="sm:col-span-2">
        <Input
          label="Task Title"
          name="title"
          required
          maxLength={150}
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="Enter task title..."
          error={titleError}
          disabled={saving}
        />
      </div>

      <div className="sm:col-span-2">
        <label
          htmlFor={`${id}-description`}
          className="nf-text-secondary mb-1.5 block text-sm font-semibold"
        >
          Description (Optional)
        </label>

        <textarea
          id={`${id}-description`}
          rows={4}
          maxLength={2000}
          disabled={saving}
          value={description}
          onChange={(event) => onDescriptionChange(event.target.value)}
          placeholder="Describe the task..."
          aria-invalid={Boolean(descriptionError)}
          aria-describedby={`${id}-description-feedback`}
          className="nf-input nf-motion w-full resize-y rounded-xl border px-4 py-3 text-sm leading-6 outline-none disabled:opacity-60"
        />

        <div
          id={`${id}-description-feedback`}
          className="mt-1 flex justify-between gap-3 text-xs"
        >
          <span
            style={{
              color: descriptionError
                ? "var(--nf-danger)"
                : "var(--nf-text-muted)",
            }}
          >
            {descriptionError ?? "Add context or instructions"}
          </span>

          <span className="nf-text-muted tabular-nums">
            {description.length.toLocaleString()} / 2,000
          </span>
        </div>
      </div>
    </>
  );
}
