import { CalendarClock } from "lucide-react";

import Input from "../ui/Input";

interface TaskDeadlineFieldProps {
  dueDate: string;
  saving: boolean;
  error?: string;
  onDueDateChange: (value: string) => void;
}

export default function TaskDeadlineField({
  dueDate,
  saving,
  error,
  onDueDateChange,
}: TaskDeadlineFieldProps) {
  return (
    <div className="sm:col-span-2">
      <Input
        label="Deadline (Optional)"
        type="datetime-local"
        name="dueDate"
        value={dueDate}
        onChange={(event) => onDueDateChange(event.target.value)}
        leadingIcon={<CalendarClock size={17} />}
        helperText="Leave empty if no deadline is needed"
        error={error}
        disabled={saving}
      />
    </div>
  );
}
