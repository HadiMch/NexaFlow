import { BarChart3 } from "lucide-react";
import type {AnalyticsOverview,AnalyticsPeriod,TaskTrend,} from "../../types/analytics";
import AnalyticsExportActions from "./AnalyticsExportActions";

interface AnalyticsHeaderProps {
  overview: AnalyticsOverview | null;
  trends: TaskTrend[];
  period: AnalyticsPeriod;
  overviewLoading: boolean;
  trendsLoading: boolean;
  overviewError: string;
  trendsError: string;
}

export default function AnalyticsHeader({
  overview,
  trends,
  period,
  overviewLoading,
  trendsLoading,
  overviewError,
  trendsError,
}: AnalyticsHeaderProps) {
  return (
    <header className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
      <div className="min-w-0">
        <p
          className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
          style={{ color: "var(--nf-primary-text)" }}
        >
          <BarChart3 size={15} aria-hidden="true" />
          Business Intelligence / Analytics
        </p>

        <h1 className="nf-page-title">Analytics & Reporting</h1>

        <p className="nf-page-subtitle mt-2">
          Understand business performance, monitor operations, and export
          actionable reports.
        </p>
      </div>

      <AnalyticsExportActions
        overview={overview}
        trends={trends}
        period={period}
        overviewLoading={overviewLoading}
        trendsLoading={trendsLoading}
        overviewError={overviewError}
        trendsError={trendsError}
      />
    </header>
  );
}
