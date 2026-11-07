import {
  AlertTriangle,
  Boxes,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Package,
  Percent,
  ShoppingBag,
  Users,
  Wallet,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";
import type { AnalyticsOverview } from "../../types/analytics";
import AnalyticsMetricCard from "./AnalyticsMetricCard";
import type { AnalyticsMetricTone } from "./AnalyticsMetricCard";

interface AnalyticsOverviewCardsProps {
  overview: AnalyticsOverview;
}

interface Metric {
  label: string;
  value: string;
  icon: LucideIcon;
  tone: AnalyticsMetricTone;
  description: string;
}

const numberFormatter = new Intl.NumberFormat("en-US");

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function AnalyticsOverviewCards({
  overview,
}: AnalyticsOverviewCardsProps) {
  const metrics: Metric[] = [
    {
      label: "Total Customers",
      value: numberFormatter.format(overview.totalCustomers),
      icon: Users,
      tone: "primary",
      description: "Customer records",
    },
    {
      label: "Total Products",
      value: numberFormatter.format(overview.totalProducts),
      icon: ShoppingBag,
      tone: "primary",
      description: "Products in the catalog",
    },
    {
      label: "Stock Quantity",
      value: numberFormatter.format(overview.totalStockQuantity),
      icon: Boxes,
      tone: "success",
      description: "Available inventory units",
    },
    {
      label: "Inventory Value",
      value: currencyFormatter.format(overview.totalInventoryValue),
      icon: Wallet,
      tone: "primary",
      description: "Estimated value at listed prices",
    },
    {
      label: "Low Stock Products",
      value: numberFormatter.format(overview.lowStockProducts),
      icon: AlertTriangle,
      tone: overview.lowStockProducts > 0 ? "warning" : "success",
      description: "Products needing attention",
    },
    {
      label: "Total Tasks",
      value: numberFormatter.format(overview.totalTasks),
      icon: ClipboardList,
      tone: "primary",
      description: "All business tasks",
    },
    {
      label: "Completed Tasks",
      value: numberFormatter.format(overview.completedTasks),
      icon: CheckCircle2,
      tone: "success",
      description: "Finished tasks",
    },
    {
      label: "Pending Tasks",
      value: numberFormatter.format(overview.pendingTasks),
      icon: Clock3,
      tone: "warning",
      description: "Tasks awaiting completion",
    },
    {
      label: "Overdue Tasks",
      value: numberFormatter.format(overview.overdueTasks),
      icon: overview.overdueTasks > 0 ? AlertTriangle : Package,
      tone: overview.overdueTasks > 0 ? "danger" : "success",
      description: "Past their deadlines",
    },
    {
      label: "Task Completion Rate",
      value: `${overview.taskCompletionRate.toFixed(2)}%`,
      icon: Percent,
      tone: "success",
      description: "Completed share of all tasks",
    },
  ];

  return (
    <section aria-label="Business overview metrics">
      <div className="mb-4">
        <h2 className="nf-section-title">Business Overview</h2>

        <p className="nf-section-description">
          Key indicators across customers, inventory, and tasks.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {metrics.map((metric) => (
          <AnalyticsMetricCard key={metric.label} {...metric} />
        ))}
      </div>
    </section>
  );
}
