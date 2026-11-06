import type { Product, ProductInput } from "../../types/product";
import Modal from "../ui/Modal";
import ConfirmDialog from "../ui/ConfirmDialog";
import ProductForm from "./ProductForm";

interface ProductDialogsProps {
  formOpen: boolean;
  editingProduct: Product | null;
  productToDelete: Product | null;
  discardOpen: boolean;
  saving: boolean;
  deletingId: number | null;
  onSubmit: (data: ProductInput) => Promise<boolean>;
  onDirtyChange: (dirty: boolean) => void;
  onCloseForm: () => void;
  onDiscard: () => void;
  onCancelDiscard: () => void;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
}

export default function ProductDialogs({
  formOpen,
  editingProduct,
  productToDelete,
  discardOpen,
  saving,
  deletingId,
  onSubmit,
  onDirtyChange,
  onCloseForm,
  onDiscard,
  onCancelDiscard,
  onConfirmDelete,
  onCancelDelete,
}: ProductDialogsProps) {
  return (
    <>
      <Modal
        open={formOpen}
        title={editingProduct ? "Edit Product" : "Add New Product"}
        description={
          editingProduct
            ? "Update product details, stock, and pricing."
            : "Enter the details for your new inventory item."
        }
        size="lg"
        disableClose={saving}
        onClose={onCloseForm}
      >
        <ProductForm
          key={editingProduct?.id ?? "new"}
          editingProduct={editingProduct}
          saving={saving}
          onSubmit={onSubmit}
          onCancel={onCloseForm}
          onDirtyChange={onDirtyChange}
        />
      </Modal>

      <ConfirmDialog
        open={discardOpen}
        title="Discard Product Changes?"
        description="Your unsaved product information will be lost."
        confirmLabel="Discard Changes"
        onConfirm={onDiscard}
        onCancel={onCancelDiscard}
      />

      <ConfirmDialog
        open={productToDelete !== null}
        title="Delete Product"
        description={
          productToDelete
            ? `Are you sure you want to delete "${productToDelete.name}"? This action cannot be undone.`
            : ""
        }
        confirmLabel="Delete Product"
        loading={deletingId !== null}
        onConfirm={onConfirmDelete}
        onCancel={onCancelDelete}
      />
    </>
  );
}
