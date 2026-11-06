import { PackagePlus } from "lucide-react";
import Button from "../ui/Button";

interface InventoryHeaderProps {
  onAdd: () => void;
}

export default function InventoryHeader({ onAdd }: InventoryHeaderProps) {
  return (
    <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p
          className="mb-2 text-xs font-bold uppercase tracking-widest"
          style={{ color: "var(--nf-primary-text)" }}
        >
          Operations / Inventory
        </p>

        <h1 className="nf-page-title">Inventory Management</h1>

        <p className="nf-page-subtitle mt-2">
          Monitor products, stock levels, and inventory value from one place.
        </p>
      </div>

      <Button icon={<PackagePlus size={18} />} onClick={onAdd}>
        Add Product
      </Button>
    </header>
  );
}
