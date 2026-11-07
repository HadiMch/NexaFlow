import { useState } from "react";
import { BarChart3, RefreshCw } from "lucide-react";
import type { AnalyticsPeriod } from "../types/analytics";
import { useAnalyticsOverview } from "../hooks/analytics/useAnalyticsOverview";
import { useTaskTrends } from "../hooks/analytics/useTaskTrends";
import AnalyticsHeader from "../components/analytics/AnalyticsHeader";
import AnalyticsOverviewCards from "../components/analytics/AnalyticsOverviewCards";
import AnalyticsOverviewSkeleton from "../components/analytics/AnalyticsOverviewSkeleton";
import TaskStatusChart from "../components/analytics/TaskStatusChart";
import InventoryHealthChart from "../components/analytics/InventoryHealthChart";
import TaskCompletionChart from "../components/analytics/TaskCompletionChart";
import TaskTrendsChart from "../components/analytics/TaskTrendsChart";
import InventoryInsights from "../components/analytics/InventoryInsights";
import PeriodPerformanceSummary from "../components/analytics/PeriodPerformanceSummary";
import Button from "../components/ui/Button";

export default function Analytics() {
  const [period, setPeriod] = useState<AnalyticsPeriod>(7);

  const {
    overview,
    loading: overviewLoading,
    error: overviewError,
    retryOverview,
  } = useAnalyticsOverview();

  const {
    trends,
    loading: trendsLoading,
    error: trendsError,
    retryTrends,
  } = useTaskTrends(period);

  return (
    <div className="nf-page space-y-8 pb-6">
      <AnalyticsHeader
        overview={overview}
        trends={trends}
        period={period}
        overviewLoading={overviewLoading}
        trendsLoading={trendsLoading}
        overviewError={overviewError}
        trendsError={trendsError}
      />

      {overviewLoading ? (
        <AnalyticsOverviewSkeleton />
      ) : overviewError ? (
        <div className="nf-surface flex flex-col items-center gap-4 rounded-2xl p-8 text-center">
          <p
            role="alert"
            className="text-sm"
            style={{ color: "var(--nf-danger)" }}
          >
            {overviewError}
          </p>

          <Button
            variant="outline"
            icon={<RefreshCw size={16} />}
            onClick={retryOverview}
          >
            Try Again
          </Button>
        </div>
      ) : overview ? (
        <div className="space-y-8">
          <AnalyticsOverviewCards overview={overview} />

          <section aria-label="Business performance charts">
            <div className="mb-4">
              <h2 className="nf-section-title">Performance Breakdown</h2>

              <p className="nf-section-description">
                Operational health and task progress at a glance.
              </p>
            </div>

            <div className="grid items-stretch gap-6 lg:grid-cols-2 xl:grid-cols-3">
              <TaskStatusChart overview={overview} />

              <InventoryHealthChart overview={overview} />

              <TaskCompletionChart overview={overview} />
            </div>
          </section>

          <InventoryInsights overview={overview} />
        </div>
      ) : (
        <div className="nf-surface flex flex-col items-center rounded-2xl px-6 py-14 text-center">
          <BarChart3
            size={30}
            style={{ color: "var(--nf-primary-text)" }}
            aria-hidden="true"
          />

          <h2 className="nf-text-primary mt-4 font-bold">
            No analytics data available
          </h2>

          <p className="nf-text-muted mt-2 text-sm">
            Business performance data is currently unavailable.
          </p>
        </div>
      )}

      <section aria-label="Task activity reporting" className="space-y-6">
        <TaskTrendsChart
          trends={trends}
          period={period}
          onPeriodChange={setPeriod}
          loading={trendsLoading}
          error={trendsError}
          onRetry={retryTrends}
        />

        {!trendsLoading && !trendsError && trends.length === period && (
          <PeriodPerformanceSummary trends={trends} period={period} />
        )}
      </section>
    </div>
  );
}
