
import { useState } from 'react'

import AnalyticsOverviewCards from '../components/analytics/AnalyticsOverviewCards'
import TaskStatusChart from '../components/analytics/TaskStatusChart'
import InventoryHealthChart from '../components/analytics/InventoryHealthChart'
import TaskCompletionChart from '../components/analytics/TaskCompletionChart'
import TaskTrendsChart from '../components/analytics/TaskTrendsChart'
import InventoryInsights from '../components/analytics/InventoryInsights'
import PeriodPerformanceSummary from '../components/analytics/PeriodPerformanceSummary'
import AnalyticsExportActions from '../components/analytics/AnalyticsExportActions'

import { useAnalyticsOverview } from '../hooks/analytics/useAnalyticsOverview'
import { useTaskTrends } from '../hooks/analytics/useTaskTrends'

import type { AnalyticsPeriod } from '../types/analytics'

function Analytics() {
  const [period, setPeriod] = useState<AnalyticsPeriod>(7)

  const {
    overview,
    loading: overviewLoading,
    error: overviewError,
  } = useAnalyticsOverview()

  const {
    trends,
    loading: trendsLoading,
    error: trendsError,
  } = useTaskTrends(period)

  return (
    <div>
      <header className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Analytics & Reporting
          </h1>

          <p className="mt-2 text-slate-500">
            Monitor business performance, analyze task activity,
            and export reports.
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

      {overviewLoading ? (
        <p className="mt-8 text-slate-500">
          Loading analytics...
        </p>
      ) : overviewError ? (
        <p role="alert" className="mt-8 text-red-600">
          {overviewError}
        </p>
      ) : overview ? (
        <>
          <AnalyticsOverviewCards overview={overview} />

          <div className="grid gap-6 lg:grid-cols-2">
            <TaskStatusChart overview={overview} />

            <InventoryHealthChart overview={overview} />

            <TaskCompletionChart overview={overview} />
          </div>

          <InventoryInsights overview={overview} />
        </>
      ) : (
        <p className="mt-8 text-slate-500">
          No analytics data available.
        </p>
      )}

      <TaskTrendsChart
        trends={trends}
        period={period}
        onPeriodChange={setPeriod}
        loading={trendsLoading}
        error={trendsError}
      />

      {!trendsLoading &&
        !trendsError &&
        trends.length === period && (
          <PeriodPerformanceSummary
            trends={trends}
            period={period}
          />
        )}
    </div>
  )
}

export default Analytics
