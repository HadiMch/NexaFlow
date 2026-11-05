import { useEffect, useRef } from "react";

interface UseModalBehaviorProps {
  open: boolean;
  disableClose: boolean;
  onClose: () => void;
}

const FOCUSABLE_SELECTOR = [
  "button:not(:disabled)",
  "input:not(:disabled)",
  "select:not(:disabled)",
  "textarea:not(:disabled)",
  "a[href]",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

const modalStack: symbol[] = [];

let previousBodyOverflow = "";

export function useModalBehavior({
  open,
  disableClose,
  onClose,
}: UseModalBehaviorProps) {
  const id = useRef(Symbol("nexaflow-modal"));
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const onCloseRef = useRef(onClose);
  const disabledRef = useRef(disableClose);

  useEffect(() => {
    onCloseRef.current = onClose;
    disabledRef.current = disableClose;
  }, [onClose, disableClose]);

  function isTopmost() {
    return modalStack.at(-1) === id.current;
  }

  useEffect(() => {
    if (!open) return;
    const modalId = id.current;
    const previousFocus = document.activeElement;

    if (modalStack.length === 0) {
      previousBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }

    modalStack.push(modalId);

    const frame = requestAnimationFrame(() => {
      if (!isTopmost()) return;

      const firstField = dialogRef.current?.querySelector<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >("input:not(:disabled), textarea:not(:disabled), select:not(:disabled)");

      (firstField ?? closeRef.current ?? dialogRef.current)?.focus();
    });

    function handleKeyDown(event: KeyboardEvent) {
     if (modalStack.at(-1) !== modalId) return;

      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();

        if (!disabledRef.current) {
          onCloseRef.current();
        }

        return;
      }

      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => element.getClientRects().length > 0);

      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      } else if (!dialog.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeyDown, true);

     const wasTopmost = modalStack.at(-1) === modalId;
      const index = modalStack.indexOf(modalId);

      if (index !== -1) {
        modalStack.splice(index, 1);
      }

      if (modalStack.length === 0) {
        document.body.style.overflow = previousBodyOverflow;
      }

      if (
        wasTopmost &&
        previousFocus instanceof HTMLElement &&
        previousFocus.isConnected
      ) {
        previousFocus.focus();
      }
    };
  }, [open]);

  return {
    dialogRef,
    closeRef,
    isTopmost,
  };
}
