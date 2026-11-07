import type { LucideIcon } from "lucide-react";

export type AnalyticsMetricTone =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "neutral";

interface AnalyticsMetricCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  tone?: AnalyticsMetricTone;
  description?: string;
}

const toneStyles: Record<
  AnalyticsMetricTone,
  { color: string; background: string }
> = {
  primary: {
    color: "var(--nf-primary-text)",
    background: "var(--nf-primary-soft)",
  },
  success: {
    color: "var(--nf-success)",
    background: "var(--nf-success-soft)",
  },
  warning: {
    color: "var(--nf-warning)",
    background: "var(--nf-warning-soft)",
  },
  danger: {
    color: "var(--nf-danger)",
    background: "var(--nf-danger-soft)",
  },
  neutral: {
    color: "var(--nf-text-secondary)",
    background: "var(--nf-surface-muted)",
  },
};

export default function AnalyticsMetricCard({
  label,
  value,
  icon: Icon,
  tone = "primary",
  description,
}: AnalyticsMetricCardProps) {
  const style = toneStyles[tone];

  return (
    <article className="nf-surface nf-motion min-w-0 rounded-2xl p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="nf-text-secondary min-w-0 text-sm font-medium">{label}</p>

        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{
            color: style.color,
            background: style.background,
          }}
        >
          <Icon size={19} aria-hidden="true" />
        </div>
      </div>

      <p className="nf-text-primary mt-4 break-words text-2xl font-bold tracking-tight tabular-nums">
        {value}
      </p>

      {description && (
        <p className="nf-text-muted mt-2 text-xs leading-5">{description}</p>
      )}
    </article>
  );
}
