import { useId } from "react";
import { createPortal } from "react-dom";

import type { ModalProps, ModalSize } from "../../types/modal";
import { useModalBehavior } from "../../hooks/ui/useModalBehavior";

import ModalHeader from "./ModalHeader";

const widths: Record<ModalSize, string> = {
  md: "max-w-xl",
  lg: "max-w-3xl",
  xl: "max-w-6xl",
};

export default function Modal({
  open,
  title,
  description,
  size = "lg",
  children,
  onClose,
  disableClose = false,
}: ModalProps) {
  const titleId = useId();
  const descriptionId = useId();

  const { dialogRef, closeRef, isTopmost } = useModalBehavior({
    open,
    disableClose,
    onClose,
  });

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
        onMouseDown={() => {
          if (!disableClose && isTopmost()) {
            onClose();
          }
        }}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={`nf-surface relative flex max-h-[92dvh] w-full flex-col overflow-hidden shadow-2xl ${widths[size]}`}
      >
        <ModalHeader
          title={title}
          description={description}
          titleId={titleId}
          descriptionId={descriptionId}
          disableClose={disableClose}
          onClose={onClose}
          closeRef={closeRef}
        />

        <div className="min-h-0 overflow-y-auto p-5 sm:p-6">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
