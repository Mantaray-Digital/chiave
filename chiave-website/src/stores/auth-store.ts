import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  customerId: string | null;
  customerName: string | null;
  customerEmail: string | null;
  _hydrated: boolean;
  setCustomer: (id: string, name: string, email: string) => void;
  clearCustomer: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      customerId: null,
      customerName: null,
      customerEmail: null,
      _hydrated: false,
      setCustomer: (id, name, email) =>
        set({ customerId: id, customerName: name, customerEmail: email }),
      clearCustomer: () =>
        set({ customerId: null, customerName: null, customerEmail: null }),
    }),
    {
      name: "chiave-auth",
      onRehydrateStorage: () => () => {
        useAuthStore.setState({ _hydrated: true });
      },
    }
  )
);

export function getSafeRedirect(param: string | null): string {
  if (!param || !param.startsWith("/") || param.startsWith("//")) {
    return "/account";
  }
  return param;
}
