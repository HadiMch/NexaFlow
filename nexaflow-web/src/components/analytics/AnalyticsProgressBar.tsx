import { useId } from "react";

interface AnalyticsProgressBarProps {
  label: string;
  value: number;
  total: number;
  color: string;
  showDetails?: boolean;
  formatAsPercentage?: boolean;
}

export default function AnalyticsProgressBar({
  label,
  value,
  total,
  color,
  showDetails = true,
  formatAsPercentage = false,
}: AnalyticsProgressBarProps) {
  const labelId = useId();
  const safeTotal = Math.max(0, total);
  const safeValue = Math.max(0, value);
  const percentage = safeTotal > 0 ? Math.min(100, (safeValue / safeTotal) * 100) : 0;
  const displayValue = formatAsPercentage
    ? `${percentage.toFixed(1)}%`
    : `${safeValue.toLocaleString()} (${percentage.toFixed(1)}%)`;

  return (
    <div className="space-y-2">
      {showDetails && (
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <span
            id={labelId}
            className="nf-text-secondary flex items-center gap-2 font-medium"
          >
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ background: color }}
              aria-hidden="true"
            />
            {label}
          </span>

          <span className="nf-text-muted tabular-nums">{displayValue}</span>
        </div>
      )}

      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={displayValue}
        className="h-3 overflow-hidden rounded-full"
        style={{
          background: "var(--nf-surface-muted)",
        }}
      >
        <div
          className="nf-motion h-full rounded-full"
          style={{
            width: `${percentage}%`,
            background: color,
          }}
        />
      </div>
    </div>
  );
}