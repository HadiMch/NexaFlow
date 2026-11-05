import { RefreshCw, Search, UsersRound } from "lucide-react";

import type { Customer } from "../../types/customer";

import Button from "../ui/Button";
import Input from "../ui/Input";
import Skeleton from "../ui/Skeleton";

import CustomerTable from "./CustomerTable";
import CustomerPagination from "./CustomerPagination";

interface CustomerDirectoryProps {
  customers: Customer[];
  loading: boolean;
  error: string | null;
  deletingId: number | null;
  search: string;
  page: number;
  totalCount: number;
  totalPages: number;
  onSearch: (value: string) => void;
  onPageChange: (page: number) => void;
  onRetry: () => void;
  onEdit: (customer: Customer) => void;
  onDelete: (id: number) => void;
  onViewActivities: (customer: Customer) => void;
}

export default function CustomerDirectory({
  customers,
  loading,
  error,
  deletingId,
  search,
  page,
  totalCount,
  totalPages,
  onSearch,
  onPageChange,
  onRetry,
  onEdit,
  onDelete,
  onViewActivities,
}: CustomerDirectoryProps) {
  return (
    <section className="nf-surface overflow-hidden">
      <div
        className="flex flex-wrap items-center justify-between gap-4 border-b p-5"
        style={{ borderColor: "var(--nf-border)" }}
      >
        <div className="flex items-center gap-3">
          <UsersRound
            size={21}
            style={{ color: "var(--nf-primary-text)" }}
            aria-hidden="true"
          />

          <div>
            <h2 className="nf-text-primary text-base font-bold">
              Customer Directory
            </h2>

            <p className="nf-text-muted mt-1 text-xs">
              Search and manage customer records.
            </p>
          </div>
        </div>

        <div className="w-full sm:w-80">
          <Input
            type="search"
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Search customers by name..."
            leadingIcon={<Search size={17} />}
            aria-label="Search customers by name"
          />
        </div>
      </div>

      {loading ? (
        <div
          role="status"
          aria-label="Loading customers"
          className="space-y-4 p-5"
        >
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton key={index} className="h-14 w-full" />
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center gap-4 p-8 text-center">
          <p
            role="alert"
            className="text-sm"
            style={{ color: "var(--nf-danger)" }}
          >
            {error}
          </p>

          <Button
            variant="outline"
            icon={<RefreshCw size={16} />}
            onClick={onRetry}
          >
            Try Again
          </Button>
        </div>
      ) : (
        <CustomerTable
          customers={customers}
          deletingId={deletingId}
          onEdit={onEdit}
          onDelete={onDelete}
          onViewActivities={onViewActivities}
        />
      )}

      {!error && (
        <div
          className="border-t px-5 py-4"
          style={{ borderColor: "var(--nf-border)" }}
        >
          <CustomerPagination
            page={page}
            totalPages={totalPages}
            totalCount={totalCount}
            loading={loading}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </section>
  );
}
