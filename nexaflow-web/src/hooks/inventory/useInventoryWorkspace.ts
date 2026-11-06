import { useMemo, useState } from "react";
import { useProducts } from "../useProducts";
import { useToast } from "../useToast";
import type {InventoryStats,Product,ProductInput,} from "../../types/product";
import type { StockFilter } from "../../components/inventory/ProductDirectory";

export function useInventoryWorkspace() {
  const data = useProducts();
  const { showToast } = useToast();
  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState<StockFilter>("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [formDirty, setFormDirty] = useState(false);
  const [discardOpen, setDiscardOpen] = useState(false);
  const stats = useMemo<InventoryStats>(
    () => ({
      totalProducts: data.products.length,
      totalStockQuantity: data.products.reduce(
        (total, product) => total + product.quantity,
        0,
      ),
      lowStockProducts: data.products.filter((product) => product.quantity <= 5)
        .length,
      totalInventoryValue: data.products.reduce(
        (total, product) => total + product.quantity * product.price,
        0,
      ),
    }),
    [data.products],
  );

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return data.products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query);

      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "in-stock" && product.quantity > 5) ||
        (stockFilter === "low-stock" &&
          product.quantity > 0 &&
          product.quantity <= 5) ||
        (stockFilter === "out-of-stock" && product.quantity === 0);

      return matchesSearch && matchesStock;
    });
  }, [data.products, search, stockFilter]);

  function openAddForm() {
    setEditingProduct(null);
    setFormDirty(false);
    setFormOpen(true);
  }

  function openEditForm(product: Product) {
    setEditingProduct(product);
    setFormDirty(false);
    setFormOpen(true);
  }

  function discardForm() {
    setDiscardOpen(false);
    setFormOpen(false);
    setEditingProduct(null);
    setFormDirty(false);
  }

  function closeForm() {
    if (data.saving) return;

    if (formDirty) {
      setDiscardOpen(true);
      return;
    }

    discardForm();
  }

  async function handleSubmit(input: ProductInput): Promise<boolean> {
    try {
      const editing = editingProduct !== null;

      const success = editingProduct
        ? await data.updateProduct(editingProduct.id, input)
        : await data.addProduct(input);

      if (success) {
        discardForm();

        showToast(
          editing
            ? "Product updated successfully."
            : "Product added successfully.",
          "success",
        );
      } else {
        showToast("Unable to save product. Please try again.", "error");
      }

      return success;
    } catch {
      showToast("Unable to save product.", "error");
      return false;
    }
  }

  function openDeleteDialog(id: number) {
    const product = data.products.find((item) => item.id === id);

    if (product) {
      setProductToDelete(product);
    }
  }

  function closeDeleteDialog() {
    if (data.deletingId !== null) return;
    setProductToDelete(null);
  }

  async function confirmDelete() {
    if (!productToDelete || data.deletingId !== null) {
      return;
    }

    const id = productToDelete.id;

    try {
      const success = await data.deleteProduct(id);

      if (success) {
        if (editingProduct?.id === id) {
          discardForm();
        }

        showToast("Product deleted successfully.", "success");
      } else {
        showToast("Unable to delete product.", "error");
      }
    } catch {
      showToast("Unable to delete product.", "error");
    } finally {
      setProductToDelete(null);
    }
  }

  return {
    ...data,
    stats,
    filteredProducts,
    search,
    setSearch,
    stockFilter,
    setStockFilter,
    formOpen,
    editingProduct,
    productToDelete,
    formDirty,
    setFormDirty,
    discardOpen,
    openAddForm,
    openEditForm,
    closeForm,
    discardForm,
    closeDiscardDialog: () => setDiscardOpen(false),
    handleSubmit,
    openDeleteDialog,
    closeDeleteDialog,
    confirmDelete,
  };
}
