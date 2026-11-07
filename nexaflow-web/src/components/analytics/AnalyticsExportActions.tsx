import { Download, FileSpreadsheet } from "lucide-react";
import type {AnalyticsOverview,AnalyticsPeriod,TaskTrend,} from "../../types/analytics";
import { exportAnalyticsOverviewCsv } from "../../utils/analytics/exportAnalyticsOverviewCsv";
import { exportTaskTrendsCsv } from "../../utils/analytics/exportTaskTrendsCsv";
import Button from "../ui/Button";

interface AnalyticsExportActionsProps {
  overview: AnalyticsOverview | null;
  trends: TaskTrend[];
  period: AnalyticsPeriod;
  overviewLoading: boolean;
  trendsLoading: boolean;
  overviewError: string;
  trendsError: string;
}

export default function AnalyticsExportActions({
  overview,
  trends,
  period,
  overviewLoading,
  trendsLoading,
  overviewError,
  trendsError,
}: AnalyticsExportActionsProps) {
  const canExportOverview = !overviewLoading && !overviewError && overview !== null;

  const canExportTrends = !trendsLoading && !trendsError && trends.length === period;

  return (
    <div
      className="flex flex-wrap gap-3"
      role="group"
      aria-label="Export analytics reports"
    >
      <Button
        icon={<Download size={17} />}
        disabled={!canExportOverview}
        onClick={() => {
          if (canExportOverview && overview) {
            exportAnalyticsOverviewCsv(overview);
          }
        }}
      >
        Export Overview
      </Button>

      <Button
        variant="outline"
        icon={<FileSpreadsheet size={17} />}
        disabled={!canExportTrends}
        onClick={() => {
          if (canExportTrends) {
            exportTaskTrendsCsv(trends, period);
          }
        }}
      >
        Export Task Trends
      </Button>
    </div>
  );
}