import {AlertTriangle,Boxes,ChartNoAxesCombined,Package,} from "lucide-react";
import type { AnalyticsOverview } from "../../types/analytics";
import AnalyticsMetricCard from "./AnalyticsMetricCard";

interface InventoryInsightsProps {
  overview: AnalyticsOverview;
}

const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function InventoryInsights({
  overview,
}: InventoryInsightsProps) {
  const {
    totalProducts,
    totalInventoryValue,
    totalStockQuantity,
    lowStockProducts,
  } = overview;

  const averageValue = totalProducts > 0 ? totalInventoryValue / totalProducts : 0;
  const averageQuantity = totalProducts > 0 ? totalStockQuantity / totalProducts : 0;
  const lowStockPercentage = totalProducts > 0 ? (lowStockProducts / totalProducts) * 100 : 0;

  const insights = [
    {
      label: "Average Value per Product",
      value: currencyFormatter.format(averageValue),
      icon: ChartNoAxesCombined,
      tone: "primary" as const,
      description: "Inventory value divided by product count",
    },
    {
      label: "Average Stock Quantity",
      value: numberFormatter.format(averageQuantity),
      icon: Boxes,
      tone: "success" as const,
      description: "Average units available per product",
    },
    {
      label: "Low Stock Percentage",
      value: `${lowStockPercentage.toFixed(1)}%`,
      icon: lowStockProducts > 0 ? AlertTriangle : Package,
      tone: lowStockProducts > 0 ? ("warning" as const) : ("success" as const),
      description: "Products at or below the stock threshold",
    },
  ];

  return (
    <section className="space-y-5">
      <div>
        <h2 className="nf-section-title">Inventory Performance Insights</h2>

        <p className="nf-section-description">
          Key indicators calculated from current inventory data.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {insights.map((insight) => (
          <AnalyticsMetricCard key={insight.label} {...insight} />
        ))}
      </div>

      {lowStockProducts > 0 && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-xl border p-4"
          style={{
            background: "var(--nf-warning-soft)",
            borderColor: "var(--nf-border)",
          }}
        >
          <AlertTriangle
            size={20}
            className="mt-0.5 shrink-0"
            style={{ color: "var(--nf-warning)" }}
            aria-hidden="true"
          />

          <div>
            <h3
              className="text-sm font-bold"
              style={{ color: "var(--nf-text-primary)" }}
            >
              Inventory Attention Required
            </h3>

            <p className="nf-text-secondary mt-1 text-sm leading-6">
              {lowStockProducts.toLocaleString()}{" "}
              {lowStockProducts === 1 ? "product is" : "products are"} at or
              below the low-stock threshold of 5 units.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}