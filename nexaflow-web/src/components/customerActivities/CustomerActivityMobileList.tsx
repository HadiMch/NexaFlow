import type { CustomerActivity } from "../../types/customerActivity";

import { formatActivityDate } from "../../utils/customerActivities/activityDates";

import ActivityTypeBadge from "./ActivityTypeBadge";
import ActivityRowActions from "./ActivityRowActions";

interface CustomerActivityMobileListProps {
  activities: CustomerActivity[];
  deletingId: number | null;
  onEdit: (activity: CustomerActivity) => void;
  onDelete: (id: number) => void;
}

export default function CustomerActivityMobileList({
  activities,
  deletingId,
  onEdit,
  onDelete,
}: CustomerActivityMobileListProps) {
  return (
    <div className="space-y-3 p-4 md:hidden">
      {activities.map((activity) => (
        <article
          key={activity.id}
          className="rounded-xl border p-4"
          style={{
            background: "var(--nf-surface-muted)",
            borderColor: "var(--nf-border)",
          }}
        >
          <div className="flex items-center justify-between gap-2">
            <ActivityTypeBadge type={activity.type} />

            <span className="nf-text-muted text-xs">#{activity.id}</span>
          </div>

          <p className="nf-text-primary mt-4 whitespace-pre-wrap break-words text-sm leading-6">
            {activity.description}
          </p>

          <dl className="mt-4 grid gap-3 text-xs">
            <div>
              <dt className="nf-text-muted">Follow-up</dt>

              <dd className="nf-text-secondary mt-1">
                {formatActivityDate(activity.followUpDate)}
              </dd>
            </div>

            <div>
              <dt className="nf-text-muted">Created</dt>

              <dd className="nf-text-secondary mt-1">
                {formatActivityDate(activity.createdAt)}
              </dd>
            </div>
          </dl>

          <div
            className="mt-4 border-t pt-4"
            style={{ borderColor: "var(--nf-border)" }}
          >
            <ActivityRowActions
              activity={activity}
              deletingId={deletingId}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        </article>
      ))}
    </div>
  );
}
