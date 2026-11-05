import { useState } from "react";

import { useCustomerWorkspace } from "../hooks/customers/useCustomerWorkspace";

import CustomerHeader from "../components/customers/CustomerHeader";
import CustomerDirectory from "../components/customers/CustomerDirectory";
import CustomerDialogs from "../components/customers/CustomerDialogs";

function CustomerWorkspacePage({ onRetry }: { onRetry: () => void }) {
  const workspace = useCustomerWorkspace();

  return (
    <div className="nf-page space-y-6 pb-6">
      <CustomerHeader
        totalCount={workspace.totalCount}
        onAdd={workspace.openAddForm}
      />

      <CustomerDirectory
        customers={workspace.customers}
        loading={workspace.loading}
        error={workspace.error}
        deletingId={workspace.deletingId}
        search={workspace.search}
        page={workspace.page}
        totalCount={workspace.totalCount}
        totalPages={workspace.totalPages}
        onSearch={workspace.changeSearch}
        onPageChange={workspace.setPage}
        onRetry={onRetry}
        onEdit={workspace.openEditForm}
        onDelete={workspace.openDeleteDialog}
        onViewActivities={workspace.openActivities}
      />

      <CustomerDialogs
        formOpen={workspace.formOpen}
        editingCustomer={workspace.editingCustomer}
        selectedCustomer={workspace.selectedCustomer}
        customerToDelete={workspace.customerToDelete}
        discardOpen={workspace.discardOpen}
        saving={workspace.saving}
        deletingId={workspace.deletingId}
        onSubmit={workspace.handleSubmit}
        onDirtyChange={workspace.setFormDirty}
        onCloseForm={workspace.closeForm}
        onDiscard={workspace.discardForm}
        onCancelDiscard={workspace.closeDiscardDialog}
        onCloseActivities={workspace.closeActivities}
        onConfirmDelete={() => void workspace.confirmDelete()}
        onCancelDelete={workspace.closeDeleteDialog}
      />
    </div>
  );
}

export default function Customers() {
  const [attempt, setAttempt] = useState(0);

  return (
    <CustomerWorkspacePage
      key={attempt}
      onRetry={() => setAttempt((current) => current + 1)}
    />
  );
}
