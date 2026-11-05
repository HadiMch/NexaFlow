import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

import type { ToastMessage } from "../../context/ToastContext";

interface ToastViewportProps {
  toasts: ToastMessage[];
  onDismiss: (id: number) => void;
}

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

export default function ToastViewport({
  toasts,
  onDismiss,
}: ToastViewportProps) {
  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[200] flex w-[calc(100%-2.5rem)] max-w-sm flex-col gap-3">
      {toasts.map((toast) => {
        const Icon = icons[toast.variant];

        return (
          <div
            key={toast.id}
            role={toast.variant === "error" ? "alert" : "status"}
            className="nf-surface pointer-events-auto flex items-start gap-3 rounded-xl p-4 shadow-xl"
          >
            <Icon
              size={20}
              className={`shrink-0 ${
                toast.variant === "success"
                  ? "text-emerald-500"
                  : toast.variant === "error"
                    ? "text-rose-500"
                    : "text-indigo-500"
              }`}
              aria-hidden="true"
            />

            <p className="nf-text-primary min-w-0 flex-1 text-sm leading-5">
              {toast.message}
            </p>

            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              aria-label="Dismiss notification"
              className="nf-text-muted nf-focusable rounded-md p-1"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
