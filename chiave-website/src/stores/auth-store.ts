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
