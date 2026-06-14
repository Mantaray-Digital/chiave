import { MantarayStore } from "@mantaray-digital/store-sdk";

let storeInstance: MantarayStore | null = null;

export function getMantarayStore(): MantarayStore {
  if (!storeInstance) {
    storeInstance = new MantarayStore({
      apiKey: process.env.MANTARAY_API_KEY ?? process.env.NEXT_PUBLIC_MANTARAY_API_KEY ?? "",
      convexUrl: process.env.CONVEX_URL ?? process.env.NEXT_PUBLIC_CONVEX_URL ?? "",
    });
  }
  return storeInstance;
}
