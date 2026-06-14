"use client";

import { MantarayProvider as Provider } from "@mantaray-digital/store-sdk/react";

export function MantarayClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider
      config={{
        apiKey: process.env.NEXT_PUBLIC_MANTARAY_API_KEY ?? "",
        convexUrl: process.env.NEXT_PUBLIC_CONVEX_URL ?? "",
      }}
      persistSession={true}
    >
      {children}
    </Provider>
  );
}
