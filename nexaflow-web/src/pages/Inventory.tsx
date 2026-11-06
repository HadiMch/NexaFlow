import { useInventoryWorkspace } from "../hooks/inventory/useInventoryWorkspace";
import InventoryHeader from "../components/inventory/InventoryHeader";
import InventoryStatsCards from "../components/inventory/InventoryStatsCards";
import ProductDirectory from "../components/inventory/ProductDirectory";
import ProductDialogs from "../components/inventory/ProductDialogs";

export default function Inventory() {
  const workspace = useInventoryWorkspace();

  return (
    <div className="nf-page space-y-6 pb-6">
      <InventoryHeader onAdd={workspace.openAddForm} />

      <InventoryStatsCards
        stats={workspace.stats}
        loading={workspace.loading}
      />

      <ProductDirectory
        products={workspace.filteredProducts}
        loading={workspace.loading}
        error={workspace.error}
        deletingId={workspace.deletingId}
        search={workspace.search}
        stockFilter={workspace.stockFilter}
        onSearch={workspace.setSearch}
        onStockFilterChange={workspace.setStockFilter}
        onRetry={() => void workspace.fetchProducts()}
        onEdit={workspace.openEditForm}
        onDelete={workspace.openDeleteDialog}
      />

      <ProductDialogs
        formOpen={workspace.formOpen}
        editingProduct={workspace.editingProduct}
        productToDelete={workspace.productToDelete}
        discardOpen={workspace.discardOpen}
        saving={workspace.saving}
        deletingId={workspace.deletingId}
        onSubmit={workspace.handleSubmit}
        onDirtyChange={workspace.setFormDirty}
        onCloseForm={workspace.closeForm}
        onDiscard={workspace.discardForm}
        onCancelDiscard={workspace.closeDiscardDialog}
        onConfirmDelete={() => void workspace.confirmDelete()}
        onCancelDelete={workspace.closeDeleteDialog}
      />
    </div>
  );
}
