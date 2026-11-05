import { useState } from "react";
import { useCustomers } from "./useCustomers";
import { useToast } from "../useToast";
import type { Customer, CustomerInput } from "../../types/customer";

export function useCustomerWorkspace() {
  const customerData = useCustomers();
  const { showToast } = useToast();

  const {
    customers,
    saving,
    deletingId,
    addCustomer,
    updateCustomer,
    deleteCustomer,
  } = customerData;

  const [formOpen, setFormOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(
    null,
  );

  const [formDirty, setFormDirty] = useState(false);
  const [discardOpen, setDiscardOpen] = useState(false);

  function openAddForm() {
    setEditingCustomer(null);
    setSelectedCustomer(null);
    setFormDirty(false);
    setFormOpen(true);
  }

  function openEditForm(customer: Customer) {
    setEditingCustomer(customer);
    setSelectedCustomer(null);
    setFormDirty(false);
    setFormOpen(true);
  }

  function closeForm() {
    if (saving) return;

    if (formDirty) {
      setDiscardOpen(true);
      return;
    }

    discardForm();
  }

  function discardForm() {
    setDiscardOpen(false);
    setFormOpen(false);
    setEditingCustomer(null);
    setFormDirty(false);
  }

  async function handleSubmit(data: CustomerInput): Promise<boolean> {
    try {
      const editing = editingCustomer !== null;

      const success = editingCustomer
        ? await updateCustomer(editingCustomer.id, data)
        : await addCustomer(data);

      if (success) {
        setFormDirty(false);
        setFormOpen(false);
        setEditingCustomer(null);

        showToast(
          editing
            ? "Customer updated successfully."
            : "Customer created successfully.",
          "success",
        );
      } else {
        showToast("Failed to save customer.", "error");
      }

      return success;
    } catch {
      showToast("Unable to save customer.", "error");
      return false;
    }
  }

  function openDeleteDialog(id: number) {
    const customer = customers.find((item) => item.id === id);
    if (customer) setCustomerToDelete(customer);
  }

  function closeDeleteDialog() {
    if (deletingId === null) setCustomerToDelete(null);
  }

  async function confirmDelete() {
    if (!customerToDelete || deletingId !== null) return;

    const id = customerToDelete.id;

    try {
      const success = await deleteCustomer(id);

      if (success) {
        setCustomerToDelete(null);
        showToast("Customer deleted successfully.", "success");
      } else {
        setCustomerToDelete(null);
        showToast("Unable to delete customer.", "error");
      }
    } catch {
      setCustomerToDelete(null);
      showToast("Unable to delete customer.", "error");
    }
  }

  function openActivities(customer: Customer) {
    setEditingCustomer(null);
    setFormOpen(false);
    setSelectedCustomer(customer);
  }

  return {
    ...customerData,
    formOpen,
    editingCustomer,
    selectedCustomer,
    customerToDelete,
    formDirty,
    discardOpen,
    setFormDirty,
    openAddForm,
    openEditForm,
    closeForm,
    discardForm,
    closeDiscardDialog: () => setDiscardOpen(false),
    handleSubmit,
    openDeleteDialog,
    closeDeleteDialog,
    confirmDelete,
    openActivities,
    closeActivities: () => setSelectedCustomer(null),
  };
}