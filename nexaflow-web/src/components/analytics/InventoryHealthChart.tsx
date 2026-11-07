import { Boxes } from "lucide-react";

import type { AnalyticsOverview } from "../../types/analytics";

import AnalyticsProgressBar from "./AnalyticsProgressBar";

interface InventoryHealthChartProps {
  overview: AnalyticsOverview;
}

export default function InventoryHealthChart({
  overview,
}: InventoryHealthChartProps) {
  const total = overview.totalProducts;
  const lowStock = overview.lowStockProducts;
  const healthy = Math.max(total - lowStock, 0);

  return (
    <section className="nf-surface flex h-full flex-col rounded-2xl p-5 sm:p-6">
      <header className="flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: "var(--nf-primary-soft)",
            color: "var(--nf-primary-text)",
          }}
        >
          <Boxes size={20} aria-hidden="true" />
        </div>

        <div>
          <h2 className="nf-section-title">Inventory Health</h2>

          <p className="nf-section-description">
            Stock availability across your product catalog.
          </p>
        </div>
      </header>

      <div className="mt-7 flex-1 space-y-6">
        <AnalyticsProgressBar
          label="Healthy Stock"
          value={healthy}
          total={total}
          color="var(--nf-success)"
        />

        <AnalyticsProgressBar
          label="Low Stock"
          value={lowStock}
          total={total}
          color="var(--nf-warning)"
        />
      </div>

      <div
        className="mt-6 border-t pt-4"
        style={{ borderColor: "var(--nf-border)" }}
      >
        <p className="nf-text-secondary text-sm">
          Total Products:{" "}
          <strong className="nf-text-primary tabular-nums">
            {total.toLocaleString()}
          </strong>
        </p>
      </div>
    </section>
  );
}
