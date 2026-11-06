import { PackagePlus, Save } from "lucide-react";
import type { Product, ProductInput } from "../../types/product";
import { useProductForm } from "../../hooks/inventory/useProductForm";
import Button from "../ui/Button";
import Input from "../ui/Input";

interface ProductFormProps {
  editingProduct: Product | null;
  saving: boolean;
  onSubmit: (data: ProductInput) => Promise<boolean>;
  onCancel: () => void;
  onDirtyChange?: (dirty: boolean) => void;
}

export default function ProductForm({
  editingProduct,
  saving,
  onSubmit,
  onCancel,
  onDirtyChange,
}: ProductFormProps) {
  const form = useProductForm({
    editingProduct,
    saving,
    onSubmit,
    onDirtyChange,
  });

  return (
    <form
      onSubmit={(event) => void form.handleSubmit(event)}
      className="space-y-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Product Name"
          name="name"
          placeholder="Enter product name"
          value={form.name}
          onChange={(event) => form.changeField("name", event.target.value)}
          required
          maxLength={150}
          error={form.errors.name}
          disabled={saving}
        />

        <Input
          label="SKU"
          name="sku"
          placeholder="e.g. PROD-001"
          value={form.sku}
          onChange={(event) => form.changeField("sku", event.target.value)}
          required
          maxLength={50}
          error={form.errors.sku}
          disabled={saving}
        />

        <Input
          label="Quantity"
          name="quantity"
          type="number"
          min="0"
          step="1"
          value={form.quantity}
          onChange={(event) => form.changeField("quantity", event.target.value)}
          required
          error={form.errors.quantity}
          disabled={saving}
          helperText="Available units in stock"
        />

        <Input
          label="Unit Price (USD)"
          name="price"
          type="number"
          min="0"
          max="999999999"
          step="0.01"
          value={form.price}
          onChange={(event) => form.changeField("price", event.target.value)}
          required
          error={form.errors.price}
          disabled={saving}
        />
      </div>

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
        <Button variant="outline" disabled={saving} onClick={onCancel}>
          Cancel
        </Button>

        <Button
          type="submit"
          loading={saving}
          icon={editingProduct ? <Save size={17} /> : <PackagePlus size={17} />}
        >
          {editingProduct ? "Save Changes" : "Add Product"}
        </Button>
      </div>
    </form>
  );
}
