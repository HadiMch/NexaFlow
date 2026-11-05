import { useId } from "react";
import { Plus, Save } from "lucide-react";

import type {
  CustomerActivity,
  UpdateCustomerActivityInput,
} from "../../types/customerActivity";

import { useCustomerActivityForm } from "../../hooks/customerActivities/useCustomerActivityForm";

import Button from "../ui/Button";
import CustomerActivityFormFields from "./CustomerActivityFormFields";

interface CustomerActivityFormProps {
  editingActivity: CustomerActivity | null;
  saving: boolean;
  onSubmit: (data: UpdateCustomerActivityInput) => Promise<boolean>;
  onCancel: () => void;
  onDirtyChange?: (dirty: boolean) => void;
}

export default function CustomerActivityForm({
  editingActivity,
  saving,
  onSubmit,
  onCancel,
  onDirtyChange,
}: CustomerActivityFormProps) {
  const formId = useId();

  const form = useCustomerActivityForm({
    editingActivity,
    saving,
    onSubmit,
    onDirtyChange,
  });

  return (
    <section
      className="nf-surface overflow-hidden"
      aria-labelledby={`${formId}-heading`}
    >
      <div
        className="border-b px-5 py-4"
        style={{ borderColor: "var(--nf-border)" }}
      >
        <h3 id={`${formId}-heading`} className="nf-section-title">
          {editingActivity ? "Edit Activity" : "Record New Activity"}
        </h3>

        <p className="nf-section-description">
          {editingActivity
            ? "Update the interaction details and follow-up."
            : "Keep a record of customer communication and next steps."}
        </p>
      </div>

      <form
        onSubmit={(event) => void form.handleSubmit(event)}
        className="space-y-5 p-5"
      >
        <CustomerActivityFormFields
          formId={formId}
          type={form.type}
          description={form.description}
          followUpDate={form.followUpDate}
          saving={saving}
          descriptionError={form.descriptionError}
          dateError={form.dateError}
          onTypeChange={form.setType}
          onDescriptionChange={form.changeDescription}
          onFollowUpDateChange={form.changeFollowUpDate}
        />

        {form.error && (
          <p
            role="alert"
            className="rounded-xl p-3 text-sm"
            style={{
              color: "var(--nf-danger)",
              background: "var(--nf-danger-soft)",
            }}
          >
            {form.error}
          </p>
        )}

        <div
          className="flex flex-wrap justify-end gap-3 border-t pt-5"
          style={{ borderColor: "var(--nf-border)" }}
        >
          {editingActivity && (
            <Button variant="outline" disabled={saving} onClick={onCancel}>
              Cancel Editing
            </Button>
          )}

          <Button
            type="submit"
            loading={saving}
            icon={editingActivity ? <Save size={17} /> : <Plus size={17} />}
          >
            {editingActivity ? "Update Activity" : "Add Activity"}
          </Button>
        </div>
      </form>
    </section>
  );
}
