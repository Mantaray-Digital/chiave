"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { Check, ShoppingBag, X } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ToastData {
  id: number;
  productName: string;
  productImage?: string;
  price?: string;
}

interface CartToastContextValue {
  showToast: (data: Omit<ToastData, "id">) => void;
}

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

const CartToastContext = createContext<CartToastContextValue | null>(null);

export function useCartToast() {
  const ctx = useContext(CartToastContext);
  if (!ctx) throw new Error("useCartToast must be used within CartToastProvider");
  return ctx;
}

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

let nextId = 0;

export function CartToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showToast = useCallback((data: Omit<ToastData, "id">) => {
    const id = ++nextId;
    setToasts((prev) => [...prev, { ...data, id }]);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <CartToastContext.Provider value={{ showToast }}>
      {children}

      {/* Portal to document.body so fixed positioning works despite parent transforms */}
      {mounted &&
        createPortal(
          <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
            {toasts.map((toast) => (
              <Toast key={toast.id} data={toast} onDismiss={dismiss} />
            ))}
          </div>,
          document.body
        )}
    </CartToastContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Single Toast                                                       */
/* ------------------------------------------------------------------ */

const TOAST_DURATION = 4000;

function Toast({
  data,
  onDismiss,
}: {
  data: ToastData;
  onDismiss: (id: number) => void;
}) {
  const [state, setState] = useState<"entering" | "visible" | "exiting">("entering");
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  /* Lifecycle: enter → visible → auto-exit */
  useEffect(() => {
    // Trigger enter animation on next frame
    const enterTimer = requestAnimationFrame(() => setState("visible"));

    // Auto-dismiss
    timerRef.current = setTimeout(() => {
      setState("exiting");
    }, TOAST_DURATION);

    return () => {
      cancelAnimationFrame(enterTimer);
      clearTimeout(timerRef.current);
    };
  }, []);

  /* Remove from DOM after exit animation */
  useEffect(() => {
    if (state === "exiting") {
      const t = setTimeout(() => onDismiss(data.id), 400);
      return () => clearTimeout(t);
    }
  }, [state, data.id, onDismiss]);

  const handleDismiss = () => {
    clearTimeout(timerRef.current);
    setState("exiting");
  };

  return (
    <div
      className={`
        pointer-events-auto relative w-[340px] overflow-hidden
        border border-[#2a2a2a] bg-[#111111]/95 shadow-2xl backdrop-blur-md
        transition-all duration-400 ease-out
        ${state === "entering" ? "translate-x-[120%] opacity-0" : ""}
        ${state === "visible" ? "translate-x-0 opacity-100" : ""}
        ${state === "exiting" ? "translate-x-[120%] opacity-0" : ""}
      `}
    >
      {/* Gold top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c8a96e] to-transparent" />

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1a1a1a]">
        <div
          className="h-full bg-[#c8a96e]/60"
          style={{
            animation: `toast-progress ${TOAST_DURATION}ms linear forwards`,
          }}
        />
      </div>

      <div className="flex items-start gap-3.5 p-4">
        {/* Product image or icon */}
        <div className="relative h-14 w-12 flex-shrink-0 overflow-hidden rounded bg-[#1a1a1a]">
          {data.productImage ? (
            <Image
              src={data.productImage}
              alt={data.productName}
              fill
              sizes="48px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-[#3a3a3a]" strokeWidth={1} />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Success badge */}
          <div className="mb-1.5 flex items-center gap-1.5">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#c8a96e]/15">
              <Check className="h-2.5 w-2.5 text-[#c8a96e]" strokeWidth={2.5} />
            </span>
            <span
              className="text-[10px] uppercase tracking-[0.2em] text-[#c8a96e]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Added to cart
            </span>
          </div>

          {/* Product name */}
          <p
            className="truncate text-sm font-light text-[#e8e2d8]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {data.productName}
          </p>

          {/* Price */}
          {data.price && (
            <p
              className="mt-0.5 text-xs text-[#8a8278]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {data.price}
            </p>
          )}

          {/* View cart link */}
          <Link
            href="/shop/cart"
            className="mt-2 inline-block text-[10px] uppercase tracking-[0.2em] text-[#8a8278] no-underline transition-colors hover:text-[#c8a96e]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            View Cart →
          </Link>
        </div>

        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 p-0.5 text-[#4a4a4a] transition-colors hover:text-[#8a8278]"
          aria-label="Dismiss"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
