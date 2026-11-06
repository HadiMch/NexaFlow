import { PackageSearch, RefreshCw, Search } from "lucide-react";
import type { Product } from "../../types/product";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Skeleton from "../ui/Skeleton";
import ProductTable from "./ProductTable";
export type StockFilter = "all" | "in-stock" | "low-stock" | "out-of-stock";

interface ProductDirectoryProps {
  products: Product[];
  loading: boolean;
  error: string;
  deletingId: number | null;
  search: string;
  stockFilter: StockFilter;
  onSearch: (value: string) => void;
  onStockFilterChange: (value: StockFilter) => void;
  onRetry: () => void;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const filters: { label: string; value: StockFilter }[] = [
  { label: "All Products", value: "all" },
  { label: "In Stock", value: "in-stock" },
  { label: "Low Stock", value: "low-stock" },
  { label: "Out of Stock", value: "out-of-stock" },
];

export default function ProductDirectory({
  products,
  loading,
  error,
  deletingId,
  search,
  stockFilter,
  onSearch,
  onStockFilterChange,
  onRetry,
  onEdit,
  onDelete,
}: ProductDirectoryProps) {
  return (
    <section className="nf-surface overflow-hidden">
      <div
        className="space-y-4 border-b p-5"
        style={{ borderColor: "var(--nf-border)" }}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="nf-section-title">Product Directory</h2>

            <p className="nf-section-description">
              {loading
                ? "Loading inventory..."
                : `${products.length.toLocaleString()} matching products`}
            </p>
          </div>

          <div className="w-full sm:max-w-xs">
            <Input
              type="search"
              value={search}
              onChange={(event) => onSearch(event.target.value)}
              placeholder="Search name or SKU..."
              leadingIcon={<Search size={17} />}
              aria-label="Search products by name or SKU"
            />
          </div>
        </div>

        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter products by stock status"
        >
          {filters.map((filter) => {
            const selected = stockFilter === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                aria-pressed={selected}
                onClick={() => onStockFilterChange(filter.value)}
                className="nf-motion rounded-lg border px-3 py-2 text-xs font-semibold"
                style={{
                  borderColor: selected
                    ? "var(--nf-primary)"
                    : "var(--nf-border)",
                  background: selected
                    ? "var(--nf-primary-soft)"
                    : "var(--nf-surface)",
                  color: selected
                    ? "var(--nf-primary-text)"
                    : "var(--nf-text-secondary)",
                }}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {loading ? (
        <div
          role="status"
          aria-label="Loading products"
          className="space-y-4 p-5"
        >
          {Array.from({ length: 5 }, (_, index) => (
            <Skeleton key={index} className="h-14 w-full" />
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center gap-4 p-8 text-center">
          <p
            role="alert"
            className="text-sm"
            style={{ color: "var(--nf-danger)" }}
          >
            {error}
          </p>

          <Button
            variant="outline"
            icon={<RefreshCw size={16} />}
            onClick={onRetry}
          >
            Try Again
          </Button>
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center px-6 py-14 text-center">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{
              color: "var(--nf-primary-text)",
              background: "var(--nf-primary-soft)",
            }}
          >
            <PackageSearch size={25} />
          </div>

          <h3 className="nf-text-primary mt-4 text-base font-bold">
            No matching products
          </h3>

          <p className="nf-text-muted mt-2 max-w-sm text-sm">
            Try another search or stock filter. If your inventory is empty, add
            your first product.
          </p>
        </div>
      ) : (
        <ProductTable
          products={products}
          deletingId={deletingId}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </section>
  );
}