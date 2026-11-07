import type { AnalyticsPeriod, TaskTrend } from "../../types/analytics";
import { downloadCsv, getUtcDateStamp } from "./csvUtils";
import type { CsvValue } from "./csvUtils";

export function exportTaskTrendsCsv(
  trends: TaskTrend[],
  period: AnalyticsPeriod,
): void {
  const rows: CsvValue[][] = [
    ["Date (UTC)", "Created Tasks", "Completed Tasks"],
    ...trends.map((trend): CsvValue[] => [
      trend.date,
      trend.createdTasks,
      trend.completedTasks,
    ]),
  ];

  const filename = `nexaflow-task-report-${period}d-${getUtcDateStamp()}.csv`;
  downloadCsv(rows, filename);
}