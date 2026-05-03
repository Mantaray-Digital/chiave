import { useState, useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  customerId: string | null;
  customerName: string | null;
  customerEmail: string | null;
  setCustomer: (id: string, name: string, email: string) => void;
  clearCustomer: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      customerId: null,
      customerName: null,
      customerEmail: null,
      setCustomer: (id, name, email) =>
        set({ customerId: id, customerName: name, customerEmail: email }),
      clearCustomer: () =>
        set({ customerId: null, customerName: null, customerEmail: null }),
    }),
    { name: "chiave-auth" }
  )
);

export function useAuthHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    const unsub = useAuthStore.persist.onFinishHydration(() =>
      setHydrated(true)
    );
    if (useAuthStore.persist.hasHydrated()) {
      setHydrated(true);
    }
    return unsub;
  }, []);
  return hydrated;
}

export function getSafeRedirect(param: string | null): string {
  if (!param || !param.startsWith("/") || param.startsWith("//")) {
    return "/account";
  }
  return param;
}

// Convex wraps server errors with a "[Request ID: ...] Server Error\nUncaught
// Error: CODE: message\n  at handler (...)" envelope. Pull just the human
// "message" out of the last CODE: text match and discard the rest.
export function friendlyAuthError(err: unknown, fallback: string): string {
  if (!(err instanceof Error)) return fallback;
  const matches = [
    ...err.message.matchAll(
      /[A-Z][A-Z0-9_]{3,}:\s*([^\n]+?)(?=\s*\n|\s+at\s|$)/g
    ),
  ];
  if (matches.length > 0) {
    const text = matches[matches.length - 1][1].trim();
    if (text) return text;
  }
  return fallback;
}
