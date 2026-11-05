import { useCallback, useEffect, useRef, useState } from "react";

import type { ReactNode } from "react";

import { ToastContext } from "./ToastContext";

import type { ToastMessage, ToastVariant } from "./ToastContext";

import ToastViewport from "../components/ui/ToastViewport";

interface ToastProviderProps {
  children: ReactNode;
}

const DURATION = 4500;

export default function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const nextId = useRef(0);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  const dismissToast = useCallback((id: number) => {
    const timer = timers.current.get(id);

    if (timer) clearTimeout(timer);
    timers.current.delete(id);

    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, variant: ToastVariant = "info") => {
      const id = ++nextId.current;

      setToasts((current) => [...current.slice(-3), { id, message, variant }]);

      const timer = setTimeout(() => {
        dismissToast(id);
      }, DURATION);

      timers.current.set(id, timer);
    },
    [dismissToast],
  );

  useEffect(() => {
    const activeTimers = timers.current;

    return () => {
      activeTimers.forEach(clearTimeout);
      activeTimers.clear();
    };
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <ToastViewport toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
}
