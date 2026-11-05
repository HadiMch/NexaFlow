import { RefreshCw } from "lucide-react";
import type { Customer } from "../../types/customer";
import { useCustomerActivityWorkspace } from "../../hooks/customerActivities/useCustomerActivityWorkspace";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import ConfirmDialog from "../ui/ConfirmDialog";
import Skeleton from "../ui/Skeleton";
import CustomerActivityForm from "./CustomerActivityForm";
import CustomerActivityTable from "./CustomerActivityTable";

interface CustomerActivitiesContentProps {
  customer: Customer;
  onClose: () => void;
  onRetry: () => void;
}

export default function CustomerActivitiesContent({
  customer,
  onClose,
  onRetry,
}: CustomerActivitiesContentProps) {
  const workspace = useCustomerActivityWorkspace(customer, onClose);

  return (
    <>
      <Modal
        open
        size="xl"
        title={`Customer Activities — ${customer.name}`}
        description="Track interactions, notes, and follow-ups."
        onClose={workspace.requestClose}
        disableClose={workspace.busy}
      >
        <div className="space-y-6">
          <div
            className="rounded-xl border p-4"
            style={{
              background: "var(--nf-surface-muted)",
              borderColor: "var(--nf-border)",
            }}
          >
            <p className="nf-text-primary text-sm font-semibold">
              {customer.name}
            </p>

            <p className="nf-text-muted mt-1 break-all text-xs">
              {customer.email}
            </p>
          </div>

          <CustomerActivityForm
            key={workspace.editingActivity?.id ?? "new"}
            editingActivity={workspace.editingActivity}
            saving={workspace.saving}
            onSubmit={workspace.handleSubmit}
            onCancel={workspace.cancelEditing}
            onDirtyChange={workspace.setFormDirty}
          />

          {workspace.loading ? (
            <div
              role="status"
              aria-label="Loading activities"
              className="space-y-3"
            >
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : workspace.error ? (
            <div
              className="rounded-xl border p-5 text-center"
              style={{
                borderColor: "var(--nf-border)",
              }}
            >
              <p
                role="alert"
                className="mb-4 text-sm"
                style={{ color: "var(--nf-danger)" }}
              >
                {workspace.error}
              </p>

              <Button
                variant="outline"
                icon={<RefreshCw size={16} />}
                onClick={onRetry}
              >
                Try Again
              </Button>
            </div>
          ) : (
            <CustomerActivityTable
              activities={workspace.activities}
              deletingId={workspace.deletingId}
              onEdit={workspace.requestEdit}
              onDelete={workspace.requestDelete}
            />
          )}
        </div>
      </Modal>

      <ConfirmDialog
        open={workspace.discardIntent !== null}
        title="Discard Activity Changes?"
        description="Your unsaved activity information will be lost."
        confirmLabel="Discard Changes"
        onConfirm={workspace.confirmDiscard}
        onCancel={workspace.cancelDiscard}
      />

      <ConfirmDialog
        open={workspace.deleteId !== null}
        title="Delete Activity"
        description="Are you sure you want to permanently delete this customer activity?"
        confirmLabel="Delete Activity"
        loading={workspace.deleting}
        onConfirm={() => void workspace.confirmDelete()}
        onCancel={workspace.cancelDelete}
      />
    </>
  );
}
