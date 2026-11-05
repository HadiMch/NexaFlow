import { History } from "lucide-react";

export default function CustomerActivityEmptyState() {
  return (
    <div className="flex flex-col items-center px-6 py-14 text-center">
      <div
        className="flex h-14 w-14 items-center justify-center rounded-2xl"
        style={{
          color: "var(--nf-primary-text)",
          background: "var(--nf-primary-soft)",
        }}
      >
        <History size={25} aria-hidden="true" />
      </div>

      <h4 className="nf-text-primary mt-4 text-base font-bold">
        No activities recorded
      </h4>

      <p className="nf-text-muted mt-2 max-w-sm text-sm leading-6">
        Record the first call, email, meeting, or note using the form above.
      </p>
    </div>
  );
}
