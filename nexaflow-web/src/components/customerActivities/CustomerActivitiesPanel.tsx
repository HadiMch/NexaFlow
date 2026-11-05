import { useState } from "react";

import type { Customer } from "../../types/customer";

import CustomerActivitiesContent from "./CustomerActivitiesContent";

interface CustomerActivitiesPanelProps {
  customer: Customer;
  onClose: () => void;
}

export default function CustomerActivitiesPanel({
  customer,
  onClose,
}: CustomerActivitiesPanelProps) {
  const [attempt, setAttempt] = useState(0);

  return (
    <CustomerActivitiesContent
      key={`${customer.id}-${attempt}`}
      customer={customer}
      onClose={onClose}
      onRetry={() => setAttempt((current) => current + 1)}
    />
  );
}
