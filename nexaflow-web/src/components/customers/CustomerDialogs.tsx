import type { Customer, CustomerInput } from "../../types/customer";
import Modal from "../ui/Modal";
import ConfirmDialog from "../ui/ConfirmDialog";
import CustomerForm from "./CustomerForm";
import CustomerActivitiesPanel from "../customerActivities/CustomerActivitiesPanel";

interface CustomerDialogsProps {
  formOpen: boolean;
  editingCustomer: Customer | null;
  selectedCustomer: Customer | null;
  customerToDelete: Customer | null;
  discardOpen: boolean;
  saving: boolean;
  deletingId: number | null;
  onSubmit: (data: CustomerInput) => Promise<boolean>;
  onDirtyChange: (dirty: boolean) => void;
  onCloseForm: () => void;
  onDiscard: () => void;
  onCancelDiscard: () => void;
  onCloseActivities: () => void;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
}

export default function CustomerDialogs({
  formOpen,
  editingCustomer,
  selectedCustomer,
  customerToDelete,
  discardOpen,
  saving,
  deletingId,
  onSubmit,
  onDirtyChange,
  onCloseForm,
  onDiscard,
  onCancelDiscard,
  onCloseActivities,
  onConfirmDelete,
  onCancelDelete,
}: CustomerDialogsProps) {
  return (
    <>
      <Modal
        open={formOpen}
        title={editingCustomer ? "Edit Customer" : "Add New Customer"}
        description={
          editingCustomer
            ? "Update customer information."
            : "Enter the details for your new customer."
        }
        size="lg"
        disableClose={saving}
        onClose={onCloseForm}
      >
        <CustomerForm
          key={editingCustomer?.id ?? "new"}
          editingCustomer={editingCustomer}
          saving={saving}
          onSubmit={onSubmit}
          onCancel={onCloseForm}
          onDirtyChange={onDirtyChange}
        />
      </Modal>

      <ConfirmDialog
        open={discardOpen}
        title="Discard Changes?"
        description="Your unsaved customer information will be lost."
        confirmLabel="Discard Changes"
        onConfirm={onDiscard}
        onCancel={onCancelDiscard}
      />

      {selectedCustomer && (
        <CustomerActivitiesPanel
          key={selectedCustomer.id}
          customer={selectedCustomer}
          onClose={onCloseActivities}
        />
      )}

      <ConfirmDialog
        open={customerToDelete !== null}
        title="Delete Customer"
        description={
          customerToDelete
            ? `Are you sure you want to delete "${customerToDelete.name}"?`
            : ""
        }
        confirmLabel="Delete Customer"
        loading={deletingId !== null}
        onConfirm={onConfirmDelete}
        onCancel={onCancelDelete}
      />
    </>
  );
}
