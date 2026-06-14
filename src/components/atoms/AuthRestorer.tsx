"use client";

import { useEffect, useRef } from "react";
import { useMantarayStore } from "@mantaray-digital/store-sdk/react";
import { useAuthStore } from "@/stores/auth-store";

export function AuthRestorer() {
  const store = useMantarayStore();
  const customerId = useAuthStore((s) => s.customerId);
  const restored = useRef(false);

  useEffect(() => {
    if (customerId && !restored.current) {
      store.setCustomer(customerId);
      restored.current = true;
    }
  }, [customerId, store]);

  return null;
}
