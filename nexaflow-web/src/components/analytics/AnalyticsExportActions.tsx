
import type {
  AnalyticsOverview,
  AnalyticsPeriod,
  TaskTrend,
} from '../../types/analytics'

import { exportAnalyticsOverviewCsv } from '../../utils/analytics/exportAnalyticsOverviewCsv'
import { exportTaskTrendsCsv } from '../../utils/analytics/exportTaskTrendsCsv'

interface AnalyticsExportActionsProps {
  overview: AnalyticsOverview | null
  trends: TaskTrend[]
  period: AnalyticsPeriod
  overviewLoading: boolean
  trendsLoading: boolean
  overviewError: string
  trendsError: string
}

function AnalyticsExportActions({
  overview,
  trends,
  period,
  overviewLoading,
  trendsLoading,
  overviewError,
  trendsError,
}: AnalyticsExportActionsProps) {
  const canExportOverview =
    !overviewLoading && !overviewError && overview !== null

  const canExportTrends =
    !trendsLoading &&
    !trendsError &&
    trends.length === period

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        disabled={!canExportOverview}
        onClick={() => {
          if (overview) {
            exportAnalyticsOverviewCsv(overview)
          }
        }}
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Export Business Overview
      </button>

      <button
        type="button"
        disabled={!canExportTrends}
        onClick={() => exportTaskTrendsCsv(trends, period)}
        className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Export Task Trends
      </button>
    </div>
  )
}

export default AnalyticsExportActions
