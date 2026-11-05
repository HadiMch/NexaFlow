import { useId } from "react";
import type { CustomerActivity } from "../../types/customerActivity";
import CustomerActivityHistoryHeader from "./CustomerActivityHistoryHeader";
import CustomerActivityEmptyState from "./CustomerActivityEmptyState";
import CustomerActivityMobileList from "./CustomerActivityMobileList";
import CustomerActivityDesktopTable from "./CustomerActivityDesktopTable";

interface CustomerActivityTableProps {
  activities: CustomerActivity[];
  deletingId: number | null;
  onEdit: (activity: CustomerActivity) => void;
  onDelete: (id: number) => void;
}

export default function CustomerActivityTable({
  activities,
  deletingId,
  onEdit,
  onDelete,
}: CustomerActivityTableProps) {
  const headingId = useId();

  const sharedProps = {
    activities,
    deletingId,
    onEdit,
    onDelete,
  };

  return (
    <section className="nf-surface overflow-hidden" aria-labelledby={headingId}>
      <CustomerActivityHistoryHeader
        count={activities.length}
        headingId={headingId}
      />

      {activities.length === 0 ? (
        <CustomerActivityEmptyState />
      ) : (
        <>
          <CustomerActivityMobileList {...sharedProps} />
          <CustomerActivityDesktopTable {...sharedProps} />
        </>
      )}
    </section>
  );
}
