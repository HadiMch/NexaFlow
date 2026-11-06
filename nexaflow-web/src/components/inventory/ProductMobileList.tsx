import { Package } from "lucide-react";
import type { Product } from "../../types/product";
import ProductStockBadge from "./ProductStockBadge";
import ProductRowActions from "./ProductRowActions";

interface ProductMobileListProps {
  products: Product[];
  deletingId: number | null;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export default function ProductMobileList({
  products,
  deletingId,
  onEdit,
  onDelete,
}: ProductMobileListProps) {
  return (
    <div className="space-y-3 p-4 md:hidden">
      {products.map((product) => (
        <article
          key={product.id}
          className="rounded-xl border p-4"
          style={{
            background: "var(--nf-surface-muted)",
            borderColor: "var(--nf-border)",
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
              style={{
                color: "var(--nf-primary-text)",
                background: "var(--nf-primary-soft)",
              }}
            >
              <Package size={20} />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="nf-text-primary break-words text-sm font-bold">
                {product.name}
              </h3>

              <p className="nf-text-muted mt-1 break-all text-xs">
                SKU: {product.sku}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <ProductStockBadge quantity={product.quantity} />
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="nf-text-muted text-xs">Quantity</dt>
              <dd className="nf-text-primary mt-1 font-semibold">
                {product.quantity.toLocaleString()}
              </dd>
            </div>

            <div>
              <dt className="nf-text-muted text-xs">Price</dt>
              <dd className="nf-text-primary mt-1 font-semibold">
                ${product.price.toFixed(2)}
              </dd>
            </div>
          </dl>

          <div
            className="mt-4 border-t pt-4"
            style={{ borderColor: "var(--nf-border)" }}
          >
            <ProductRowActions
              product={product}
              deletingId={deletingId}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        </article>
      ))}
    </div>
  );
}
