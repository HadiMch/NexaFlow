import type { Product } from "../../types/product";
import ProductMobileList from "./ProductMobileList";
import ProductRowActions from "./ProductRowActions";
import ProductStockBadge from "./ProductStockBadge";

interface ProductTableProps {
  products: Product[];
  deletingId: number | null;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export default function ProductTable({
  products,
  deletingId,
  onEdit,
  onDelete,
}: ProductTableProps) {
  const actions = {
    deletingId,
    onEdit,
    onDelete,
  };

  return (
    <>
      <ProductMobileList products={products} {...actions} />

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[850px] text-left text-sm">
          <thead
            style={{
              background: "var(--nf-surface-muted)",
              color: "var(--nf-text-muted)",
            }}
          >
            <tr>
              <th scope="col" className="px-4 py-4 font-semibold">
                Product
              </th>
              <th scope="col" className="px-4 py-4 font-semibold">
                SKU
              </th>
              <th scope="col" className="px-4 py-4 font-semibold">
                Stock Status
              </th>
              <th scope="col" className="px-4 py-4 font-semibold">
                Quantity
              </th>
              <th scope="col" className="px-4 py-4 font-semibold">
                Price
              </th>
              <th scope="col" className="px-4 py-4 font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="nf-customer-row border-t"
                style={{
                  borderColor: "var(--nf-border-soft)",
                }}
              >
                <td className="nf-text-primary max-w-[240px] break-words px-4 py-4 align-top font-semibold">
                  {product.name}
                </td>

                <td className="nf-text-secondary max-w-[180px] break-all px-4 py-4 align-top">
                  {product.sku}
                </td>

                <td className="px-4 py-4 align-top">
                  <ProductStockBadge quantity={product.quantity} />
                </td>

                <td className="nf-text-secondary px-4 py-4 align-top tabular-nums">
                  {product.quantity.toLocaleString()}
                </td>

                <td className="nf-text-secondary px-4 py-4 align-top tabular-nums">
                  ${product.price.toFixed(2)}
                </td>

                <td className="px-4 py-4 align-top">
                  <ProductRowActions product={product} {...actions} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
