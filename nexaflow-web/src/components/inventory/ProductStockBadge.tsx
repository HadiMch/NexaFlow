import Badge from "../ui/Badge";

interface ProductStockBadgeProps {
  quantity: number;
}

export default function ProductStockBadge({
  quantity,
}: ProductStockBadgeProps) {
  if (quantity === 0) {
    return <Badge variant="danger">Out of Stock</Badge>;
  }

  if (quantity <= 5) {
    return <Badge variant="warning">Low Stock ({quantity})</Badge>;
  }

  return <Badge variant="success">In Stock ({quantity})</Badge>;
}
