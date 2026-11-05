import type { CustomerActivity } from "../../types/customerActivity";

import { formatActivityDate } from "../../utils/customerActivities/activityDates";

import ActivityTypeBadge from "./ActivityTypeBadge";
import ActivityRowActions from "./ActivityRowActions";

interface CustomerActivityDesktopTableProps {
  activities: CustomerActivity[];
  deletingId: number | null;
  onEdit: (activity: CustomerActivity) => void;
  onDelete: (id: number) => void;
}

export default function CustomerActivityDesktopTable({
  activities,
  deletingId,
  onEdit,
  onDelete,
}: CustomerActivityDesktopTableProps) {
  return (
    <div className="hidden overflow-x-auto md:block">
      <table className="w-full min-w-[860px] text-left text-sm">
        <thead
          style={{
            color: "var(--nf-text-muted)",
            background: "var(--nf-surface-muted)",
          }}
        >
          <tr>
            <th scope="col" className="px-4 py-4 font-semibold">
              Type
            </th>

            <th scope="col" className="px-4 py-4 font-semibold">
              Description
            </th>

            <th scope="col" className="px-4 py-4 font-semibold">
              Follow-up
            </th>

            <th scope="col" className="px-4 py-4 font-semibold">
              Created
            </th>

            <th scope="col" className="px-4 py-4 font-semibold">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {activities.map((activity) => (
            <tr
              key={activity.id}
              className="nf-customer-row border-t"
              style={{
                borderColor: "var(--nf-border-soft)",
              }}
            >
              <td className="px-4 py-4 align-top">
                <ActivityTypeBadge type={activity.type} />
              </td>

              <td className="nf-text-secondary max-w-xs whitespace-pre-wrap break-words px-4 py-4 align-top leading-6">
                {activity.description}
              </td>

              <td className="nf-text-secondary whitespace-nowrap px-4 py-4 align-top">
                {formatActivityDate(activity.followUpDate)}
              </td>

              <td className="nf-text-secondary whitespace-nowrap px-4 py-4 align-top">
                {formatActivityDate(activity.createdAt)}
              </td>

              <td className="px-4 py-4 align-top">
                <ActivityRowActions
                  activity={activity}
                  deletingId={deletingId}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
