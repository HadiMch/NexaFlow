import { Pencil, Trash2 } from "lucide-react";
import type { Product } from "../../types/product";
import Button from "../ui/Button";

interface ProductRowActionsProps {
  product: Product;
  deletingId: number | null;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export default function ProductRowActions({
  product,
  deletingId,
  onEdit,
  onDelete,
}: ProductRowActionsProps) {
  const busy = deletingId !== null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        size="sm"
        variant="outline"
        icon={<Pencil size={15} />}
        disabled={busy}
        onClick={() => onEdit(product)}
      >
        Edit
      </Button>

      <Button
        size="sm"
        variant="danger"
        icon={<Trash2 size={15} />}
        disabled={busy}
        loading={deletingId === product.id}
        onClick={() => onDelete(product.id)}
      >
        Delete
      </Button>
    </div>
  );
}
