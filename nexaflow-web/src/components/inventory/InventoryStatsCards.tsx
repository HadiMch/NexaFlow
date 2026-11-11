import { AlertTriangle, Boxes, Package, Wallet } from "lucide-react";
import type { ReactNode } from "react";
import type { InventoryStats } from "../../types/product";

interface InventoryStatCardProps {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
  tone?: "primary" | "warning" | "success";
}

function InventoryStatCard({
  title,
  value,
  description,
  icon,
  tone = "primary",
}: InventoryStatCardProps) {
  const toneClass = {
    primary: "nf-stat-primary",
    warning: "nf-stat-warning",
    success: "nf-stat-success",
  }[tone];

  return (
    <article className={`nf-surface nf-motion ${toneClass} rounded-2xl p-5`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="nf-text-secondary text-sm font-medium">{title}</p>

          <p className="nf-text-primary mt-3 wrap-break-word text-2xl font-bold tracking-tight tabular-nums">
            {value}
          </p>
        </div>

        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
          style={{
            color: "var(--nf-primary-text)",
            background: "var(--nf-primary-soft)",
          }}
        >
          {icon}
        </div>
      </div>

      <p className="nf-text-muted mt-3 text-xs">{description}</p>
    </article>
  );
}

interface InventoryStatsCardsProps {
  stats: InventoryStats;
  loading: boolean;
}

export default function InventoryStatsCards({
  stats,
  loading,
}: InventoryStatsCardsProps) {
  const formatNumber = (value: number) => value.toLocaleString();

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  return (
    <div
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      aria-busy={loading}
    >
      <InventoryStatCard
        title="Total Products"
        value={loading ? "—" : formatNumber(stats.totalProducts)}
        description="Products in your catalog"
        icon={<Package size={21} />}
      />

      <InventoryStatCard
        title="Units in Stock"
        value={loading ? "—" : formatNumber(stats.totalStockQuantity)}
        description="Total available units"
        icon={<Boxes size={21} />}
        tone="success"
      />

      <InventoryStatCard
        title="Low / Out of Stock"
        value={loading ? "—" : formatNumber(stats.lowStockProducts)}
        description="Products with 5 units or fewer"
        icon={<AlertTriangle size={21} />}
        tone="warning"
      />

      <InventoryStatCard
        title="Inventory Value"
        value={loading ? "—" : formatCurrency(stats.totalInventoryValue)}
        description="Estimated value at listed prices"
        icon={<Wallet size={21} />}
      />
    </div>
  );
}
