import type { AnalyticsOverview } from "../../types/analytics";
import { downloadCsv, getUtcDateStamp } from "./csvUtils";
import type { CsvValue } from "./csvUtils";

export function exportAnalyticsOverviewCsv(overview: AnalyticsOverview): void {
  const rows: CsvValue[][] = [
    ["Category", "Metric", "Value"],

    ["Customers", "Total Customers", overview.totalCustomers],

    ["Inventory", "Total Products", overview.totalProducts],
    ["Inventory", "Total Stock Quantity", overview.totalStockQuantity],
    ["Inventory", "Total Inventory Value", overview.totalInventoryValue],
    ["Inventory", "Low Stock Products", overview.lowStockProducts],

    ["Tasks", "Total Tasks", overview.totalTasks],
    ["Tasks", "To Do Tasks", overview.todoTasks],
    ["Tasks", "In Progress Tasks", overview.inProgressTasks],
    ["Tasks", "Completed Tasks", overview.completedTasks],
    ["Tasks", "Pending Tasks", overview.pendingTasks],
    ["Tasks", "Overdue Tasks", overview.overdueTasks],

    ["Performance", "Task Completion Rate (%)", overview.taskCompletionRate],
  ];

  const filename = `nexaflow-business-overview-${getUtcDateStamp()}.csv`;

  downloadCsv(rows, filename);
}
