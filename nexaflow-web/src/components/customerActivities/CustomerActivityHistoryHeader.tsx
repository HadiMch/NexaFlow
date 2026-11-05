import { History } from "lucide-react";

interface CustomerActivityHistoryHeaderProps {
  count: number;
  headingId: string;
}

export default function CustomerActivityHistoryHeader({
  count,
  headingId,
}: CustomerActivityHistoryHeaderProps) {
  return (
    <div
      className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4"
      style={{ borderColor: "var(--nf-border)" }}
    >
      <div>
        <h3 id={headingId} className="nf-section-title flex items-center gap-2">
          <History
            size={20}
            style={{ color: "var(--nf-primary-text)" }}
            aria-hidden="true"
          />
          Activity History
        </h3>

        <p className="nf-section-description">
          Recorded interactions and follow-up details.
        </p>
      </div>

      <span
        className="rounded-lg px-3 py-1.5 text-xs font-semibold"
        style={{
          color: "var(--nf-primary-text)",
          background: "var(--nf-primary-soft)",
        }}
      >
        {count.toLocaleString()} {count === 1 ? "activity" : "activities"}
      </span>
    </div>
  );
}
