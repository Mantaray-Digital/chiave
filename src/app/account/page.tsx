"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Package, LogOut, User, Loader2 } from "lucide-react";
import {
  useCustomer,
  useOrders,
  useMantarayStore,
  useStoreConfig,
} from "@mantaray-digital/store-sdk/react";
import { useAuthStore, useAuthHydrated } from "@/stores/auth-store";
import { formatPrice } from "@/lib/format-price";

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-500",
  processing: "bg-blue-500/10 text-blue-500",
  shipped: "bg-purple-500/10 text-purple-500",
  delivered: "bg-green-500/10 text-green-500",
  cancelled: "bg-red-500/10 text-red-500",
};

export default function AccountPage() {
  const router = useRouter();
  const store = useMantarayStore();

  const customerId = useAuthStore((s) => s.customerId);
  const customerName = useAuthStore((s) => s.customerName);
  const hydrated = useAuthHydrated();
  const clearCustomerAuth = useAuthStore((s) => s.clearCustomer);

  const { profile, loading: profileLoading, logout } = useCustomer();
  const { data: orders, loading: ordersLoading } = useOrders(customerId ?? undefined);
  const { data: storeConfig } = useStoreConfig();

  // Redirect if not logged in (wait for hydration first)
  useEffect(() => {
    if (hydrated && customerId === null) {
      router.replace("/account/login");
    }
  }, [hydrated, customerId, router]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // continue even if API logout fails
    }
    clearCustomerAuth();
    store.clearCustomer();
    router.replace("/");
  };

  const formatDate = (dateString: string | number) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const currencySettings = storeConfig?.settings ?? {
    currencySymbol: "$",
    currencyPosition: "before" as const,
  };

  const renderPrice = (amount: number) => formatPrice(amount, currencySettings);

  // Show loading while hydrating, checking auth, or loading data
  if (!hydrated || customerId === null || (profileLoading && !profile)) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <Loader2 className="h-8 w-8 animate-spin text-[#c8a96e]" />
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="grain relative flex h-[35vh] items-center justify-center overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/40 to-[#0a0a0a]" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <span
            className="animate-hero-reveal mb-4 text-xs font-medium uppercase text-[#c8a96e]"
            style={{ fontFamily: "var(--font-body)", letterSpacing: "0.5em" }}
          >
            Your Account
          </span>
          <div className="overflow-hidden">
            <h1
              className="animate-hero-slide-up font-light text-[#e8e2d8]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                fontWeight: 300,
                letterSpacing: "0.08em",
              }}
            >
              Welcome, {customerName || "Guest"}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-[#0a0a0a] px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {/* Profile Info */}
          <div className="border border-[#2a2a2a] bg-[#0f0f0f] p-6">
            <div className="mb-6 flex items-center gap-3">
              <User className="h-5 w-5 text-[#c8a96e]" />
              <h2
                className="text-lg font-light uppercase tracking-[0.15em] text-[#e8e2d8]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Profile Info
              </h2>
            </div>

            {profileLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-5 w-5 animate-spin text-[#c8a96e]" />
              </div>
            ) : profile ? (
              <div className="flex flex-col gap-4">
                <div>
                  <p
                    className="mb-1 text-[10px] uppercase tracking-[0.2em] text-[#8a8278]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Name
                  </p>
                  <p
                    className="text-sm text-[#e8e2d8]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {profile.name}
                  </p>
                </div>
                <div>
                  <p
                    className="mb-1 text-[10px] uppercase tracking-[0.2em] text-[#8a8278]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Email
                  </p>
                  <p
                    className="text-sm text-[#e8e2d8]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {profile.email}
                  </p>
                </div>
                {profile.phone && (
                  <div>
                    <p
                      className="mb-1 text-[10px] uppercase tracking-[0.2em] text-[#8a8278]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Phone
                    </p>
                    <p
                      className="text-sm text-[#e8e2d8]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {profile.phone}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div>
                  <p
                    className="mb-1 text-[10px] uppercase tracking-[0.2em] text-[#8a8278]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Name
                  </p>
                  <p
                    className="text-sm text-[#e8e2d8]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {customerName}
                  </p>
                </div>
              </div>
            )}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="mt-8 flex items-center gap-2 border border-[#2a2a2a] px-8 py-3 text-xs uppercase tracking-[0.25em] text-[#8a8278] transition-colors hover:border-red-500/60 hover:text-red-400"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>

          {/* Order History */}
          <div className="border border-[#2a2a2a] bg-[#0f0f0f] p-6">
            <div className="mb-6 flex items-center gap-3">
              <Package className="h-5 w-5 text-[#c8a96e]" />
              <h2
                className="text-lg font-light uppercase tracking-[0.15em] text-[#e8e2d8]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Order History
              </h2>
            </div>

            {ordersLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-5 w-5 animate-spin text-[#c8a96e]" />
              </div>
            ) : orders && orders.length > 0 ? (
              <div className="flex flex-col">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="flex flex-col gap-2 border-b border-[#2a2a2a] py-4 first:pt-0 last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <p
                        className="text-sm font-medium text-[#e8e2d8]"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        #{order.orderNumber}
                      </p>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${statusStyles[order.status] || "bg-gray-500/10 text-gray-500"}`}
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p
                        className="text-sm text-[#8a8278]"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {formatDate(order.createdAt)}
                      </p>
                      <p
                        className="text-sm text-[#e8e2d8]"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {renderPrice(order.total)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center py-8 text-center">
                <Package className="mb-3 h-10 w-10 text-[#2a2a2a]" />
                <p
                  className="mb-1 text-sm text-[#8a8278]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  No orders yet
                </p>
                <Link
                  href="/shop"
                  className="mt-2 text-xs uppercase tracking-[0.2em] text-[#c8a96e] hover:underline"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Browse the shop
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
