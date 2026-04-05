"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CreditCard, Banknote, Landmark, ShoppingBag, Loader2 } from "lucide-react";
import {
  useCart,
  useStoreConfig,
  useShippingTiers,
  useMantarayStore,
} from "@mantaray-digital/store-sdk/react";
import { formatPrice } from "@/lib/format-price";
import { useAuthStore, useAuthHydrated } from "@/stores/auth-store";

interface ShippingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const PAYMENT_METHODS = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
  { id: "bank", label: "Bank Transfer", icon: Landmark },
  { id: "cod", label: "Cash on Delivery", icon: Banknote },
] as const;

const INITIAL_SHIPPING: ShippingFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  country: "Egypt",
};

export default function CheckoutPage() {
  const router = useRouter();
  const store = useMantarayStore();
  const { cart, loading: cartLoading, error: cartError } = useCart();
  const { data: storeConfig } = useStoreConfig();
  const { data: shippingTiers, loading: tiersLoading } = useShippingTiers();
  const authCustomerId = useAuthStore((s) => s.customerId);
  const authHydrated = useAuthHydrated();

  useEffect(() => {
    if (authHydrated && authCustomerId === null) {
      router.replace("/account/login?redirect=/shop/checkout");
    }
  }, [authHydrated, authCustomerId, router]);

  const [shipping, setShipping] = useState<ShippingFormData>(INITIAL_SHIPPING);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [selectedTierId, setSelectedTierId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingFormData, boolean>>>({});
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  const currencySettings = storeConfig?.settings ?? {
    currencySymbol: "$",
    currencyPosition: "before" as const,
  };

  const displayPrice = (amount: number) => formatPrice(amount, currencySettings);

  const items = cart?.items ?? [];
  const count = cart?.itemCount ?? 0;
  const subtotal = cart?.subtotal ?? 0;

  // Auto-select first shipping tier when tiers load
  const activeTierId = selectedTierId ?? shippingTiers?.[0]?._id ?? null;
  const selectedTier = shippingTiers?.find((t) => t._id === activeTierId) ?? null;
  const shippingCost = selectedTier
    ? store.shipping.calculateCost(selectedTier, subtotal)
    : 0;
  const total = subtotal + shippingCost;

  const updateField = (field: keyof ShippingFormData, value: string) => {
    setShipping((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const validate = (): boolean => {
    const required: (keyof ShippingFormData)[] = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "country",
    ];
    const newErrors: Partial<Record<keyof ShippingFormData, boolean>> = {};
    let valid = true;
    for (const field of required) {
      if (!shipping[field].trim()) {
        newErrors[field] = true;
        valid = false;
      }
    }
    setErrors(newErrors);
    return valid;
  };

  const handlePlaceOrder = async () => {
    if (!validate()) return;
    if (!activeTierId) return;

    setOrderLoading(true);
    setOrderError(null);

    try {
      const result = await store.checkout.createOrder({
        customerId: authCustomerId!,
        shippingAddress: {
          name: `${shipping.firstName} ${shipping.lastName}`.trim(),
          phone: shipping.phone,
          addressLine1: shipping.address,
          addressLine2: shipping.state || undefined,
          city: shipping.city,
          postalCode: shipping.zipCode || undefined,
        },
        shippingTierId: activeTierId,
      });

      router.push(
        `/shop/order-confirmed?orderNumber=${encodeURIComponent(result.orderNumber)}&total=${result.total}`
      );
    } catch (err) {
      setOrderError(err instanceof Error ? err.message : "Failed to place order. Please try again.");
    } finally {
      setOrderLoading(false);
    }
  };

  if (!authHydrated || !authCustomerId) {
    return (
      <>
        <section className="grain relative flex h-[35vh] items-center justify-center overflow-hidden bg-[#0a0a0a]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/40 to-[#0a0a0a]" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <span
              className="animate-hero-reveal mb-4 text-xs font-medium uppercase text-[#c8a96e]"
              style={{ fontFamily: "var(--font-body)", letterSpacing: "0.5em" }}
            >
              Final Step
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
                Checkout
              </h1>
            </div>
          </div>
        </section>
        <section className="flex items-center justify-center bg-[#0a0a0a] px-6 py-24">
          <Loader2 className="h-8 w-8 animate-spin text-[#c8a96e]" />
        </section>
      </>
    );
  }

  if (cartLoading) {
    return (
      <>
        <section className="grain relative flex h-[35vh] items-center justify-center overflow-hidden bg-[#0a0a0a]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/40 to-[#0a0a0a]" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <span
              className="animate-hero-reveal mb-4 text-xs font-medium uppercase text-[#c8a96e]"
              style={{ fontFamily: "var(--font-body)", letterSpacing: "0.5em" }}
            >
              Final Step
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
                Checkout
              </h1>
            </div>
          </div>
        </section>
        <section className="flex items-center justify-center bg-[#0a0a0a] px-6 py-24">
          <Loader2 className="h-8 w-8 animate-spin text-[#c8a96e]" />
        </section>
      </>
    );
  }

  if (cartError || items.length === 0) {
    return (
      <>
        <section className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-6 text-center">
          <ShoppingBag className="mb-6 h-16 w-16 text-[#2a2a2a]" strokeWidth={1} />
          <h1
            className="mb-3 text-2xl font-light text-[#e8e2d8]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Nothing to check out
          </h1>
          <p
            className="mb-8 text-sm text-[#8a8278]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Add items to your cart before proceeding to checkout.
          </p>
          <Link
            href="/shop"
            className="bg-[#c8a96e] px-8 py-3 text-xs uppercase tracking-[0.25em] text-[#0a0a0a] no-underline transition-colors hover:bg-[#b8994e]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Browse Shop
          </Link>
        </section>
      </>
    );
  }

  const inputClass = (field: keyof ShippingFormData) =>
    `w-full border bg-transparent px-4 py-3 text-sm text-[#e8e2d8] outline-none transition-colors placeholder:text-[#4a4a4a] focus:border-[#c8a96e] ${
      errors[field] ? "border-red-500/60" : "border-[#2a2a2a]"
    }`;

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
            Final Step
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
              Checkout
            </h1>
          </div>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="bg-[#0a0a0a] px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/shop/cart"
            className="mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8a8278] no-underline transition-colors hover:text-[#c8a96e]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Link>

          <div className="grid gap-12 lg:grid-cols-3">
            {/* Form */}
            <div className="lg:col-span-2">
              {/* Shipping Information */}
              <div className="mb-12">
                <h2
                  className="mb-6 text-xl font-light uppercase tracking-[0.15em] text-[#e8e2d8]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Shipping Information
                </h2>

                <div
                  className="grid gap-4 md:grid-cols-2"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  <div>
                    <label className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-[#8a8278]">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={shipping.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)}
                      placeholder="Khaled"
                      className={inputClass("firstName")}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-[#8a8278]">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={shipping.lastName}
                      onChange={(e) => updateField("lastName", e.target.value)}
                      placeholder="Sorour"
                      className={inputClass("lastName")}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-[#8a8278]">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={shipping.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="hello@example.com"
                      className={inputClass("email")}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-[#8a8278]">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={shipping.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="+20 100 000 0000"
                      className={inputClass("phone")}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-[#8a8278]">
                      Address *
                    </label>
                    <input
                      type="text"
                      value={shipping.address}
                      onChange={(e) => updateField("address", e.target.value)}
                      placeholder="Street address, apartment, suite"
                      className={inputClass("address")}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-[#8a8278]">
                      City *
                    </label>
                    <input
                      type="text"
                      value={shipping.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      placeholder="Cairo"
                      className={inputClass("city")}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-[#8a8278]">
                      State / Governorate
                    </label>
                    <input
                      type="text"
                      value={shipping.state}
                      onChange={(e) => updateField("state", e.target.value)}
                      placeholder="Cairo Governorate"
                      className={inputClass("state")}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-[#8a8278]">
                      Zip / Postal Code
                    </label>
                    <input
                      type="text"
                      value={shipping.zipCode}
                      onChange={(e) => updateField("zipCode", e.target.value)}
                      placeholder="11511"
                      className={inputClass("zipCode")}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-[#8a8278]">
                      Country *
                    </label>
                    <input
                      type="text"
                      value={shipping.country}
                      onChange={(e) => updateField("country", e.target.value)}
                      placeholder="Egypt"
                      className={inputClass("country")}
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="mb-12">
                <h2
                  className="mb-6 text-xl font-light uppercase tracking-[0.15em] text-[#e8e2d8]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Shipping Method
                </h2>

                {tiersLoading ? (
                  <div className="flex items-center gap-3 py-4">
                    <Loader2 className="h-4 w-4 animate-spin text-[#c8a96e]" />
                    <span
                      className="text-xs text-[#8a8278]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Loading shipping options...
                    </span>
                  </div>
                ) : shippingTiers && shippingTiers.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {shippingTiers.map((tier) => {
                      const tierCost = store.shipping.calculateCost(tier, subtotal);
                      const isSelected = tier._id === activeTierId;
                      return (
                        <button
                          key={tier._id}
                          onClick={() => setSelectedTierId(tier._id)}
                          className={`flex items-center justify-between border px-5 py-4 text-left transition-colors ${
                            isSelected
                              ? "border-[#c8a96e] bg-[#c8a96e]/5"
                              : "border-[#2a2a2a] hover:border-[#3a3a3a]"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`h-4 w-4 rounded-full border ${
                                isSelected
                                  ? "border-[#c8a96e] bg-[#c8a96e]"
                                  : "border-[#3a3a3a]"
                              }`}
                            >
                              {isSelected && (
                                <div className="flex h-full w-full items-center justify-center">
                                  <div className="h-1.5 w-1.5 rounded-full bg-[#0a0a0a]" />
                                </div>
                              )}
                            </div>
                            <div>
                              <span
                                className={`text-sm ${isSelected ? "text-[#e8e2d8]" : "text-[#8a8278]"}`}
                                style={{ fontFamily: "var(--font-body)" }}
                              >
                                {tier.name}
                              </span>
                              {tier.estimatedDays && (
                                <p
                                  className="mt-0.5 text-[10px] text-[#8a8278]"
                                  style={{ fontFamily: "var(--font-body)" }}
                                >
                                  {tier.estimatedDays}
                                </p>
                              )}
                            </div>
                          </div>
                          <span
                            className={`text-sm ${isSelected ? "text-[#e8e2d8]" : "text-[#8a8278]"}`}
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            {tierCost === 0 ? "Free" : displayPrice(tierCost)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p
                    className="text-xs text-[#8a8278]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    No shipping options available.
                  </p>
                )}
              </div>

              {/* Payment Method */}
              <div>
                <h2
                  className="mb-6 text-xl font-light uppercase tracking-[0.15em] text-[#e8e2d8]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Payment Method
                </h2>

                <div className="flex flex-col gap-3">
                  {PAYMENT_METHODS.map((method) => {
                    const Icon = method.icon;
                    const selected = paymentMethod === method.id;
                    return (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`flex items-center gap-4 border px-5 py-4 text-left transition-colors ${
                          selected
                            ? "border-[#c8a96e] bg-[#c8a96e]/5"
                            : "border-[#2a2a2a] hover:border-[#3a3a3a]"
                        }`}
                      >
                        <Icon
                          className={`h-5 w-5 ${selected ? "text-[#c8a96e]" : "text-[#8a8278]"}`}
                          strokeWidth={1.5}
                        />
                        <span
                          className={`text-sm ${selected ? "text-[#e8e2d8]" : "text-[#8a8278]"}`}
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {method.label}
                        </span>
                        <div
                          className={`ml-auto h-4 w-4 rounded-full border ${
                            selected
                              ? "border-[#c8a96e] bg-[#c8a96e]"
                              : "border-[#3a3a3a]"
                          }`}
                        >
                          {selected && (
                            <div className="flex h-full w-full items-center justify-center">
                              <div className="h-1.5 w-1.5 rounded-full bg-[#0a0a0a]" />
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {paymentMethod === "card" && (
                  <div
                    className="mt-6 grid gap-4 md:grid-cols-2"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    <div className="md:col-span-2">
                      <label className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-[#8a8278]">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        className="w-full border border-[#2a2a2a] bg-transparent px-4 py-3 text-sm text-[#e8e2d8] outline-none transition-colors placeholder:text-[#4a4a4a] focus:border-[#c8a96e]"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-[#8a8278]">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="w-full border border-[#2a2a2a] bg-transparent px-4 py-3 text-sm text-[#e8e2d8] outline-none transition-colors placeholder:text-[#4a4a4a] focus:border-[#c8a96e]"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-[#8a8278]">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="000"
                        className="w-full border border-[#2a2a2a] bg-transparent px-4 py-3 text-sm text-[#e8e2d8] outline-none transition-colors placeholder:text-[#4a4a4a] focus:border-[#c8a96e]"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === "bank" && (
                  <div
                    className="mt-6 border border-[#2a2a2a] bg-[#0f0f0f] p-5"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    <p className="text-xs leading-relaxed text-[#8a8278]">
                      After placing your order, you will receive bank transfer details via
                      email. Please complete the transfer within 48 hours to confirm your
                      order.
                    </p>
                  </div>
                )}

                {paymentMethod === "cod" && (
                  <div
                    className="mt-6 border border-[#2a2a2a] bg-[#0f0f0f] p-5"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    <p className="text-xs leading-relaxed text-[#8a8278]">
                      Pay in cash when your order is delivered. Available for orders within
                      Egypt only.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 border border-[#2a2a2a] bg-[#0f0f0f] p-6">
                <h2
                  className="mb-6 text-lg font-light uppercase tracking-[0.15em] text-[#e8e2d8]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Order Summary
                </h2>

                {/* Items preview */}
                <ul className="m-0 mb-6 flex list-none flex-col gap-4 p-0">
                  {items.map((item) => (
                    <li key={`${item.productId}-${item.variantId ?? ""}`} className="flex gap-3">
                      <div className="relative h-14 w-12 flex-shrink-0 overflow-hidden rounded bg-[#1a1a1a]">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <ShoppingBag className="h-4 w-4 text-[#3a3a3a]" strokeWidth={1} />
                          </div>
                        )}
                        <span
                          className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#c8a96e] text-[9px] font-medium text-[#0a0a0a]"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col justify-center">
                        <span
                          className="text-xs text-[#e8e2d8]"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {item.name}
                        </span>
                        <span
                          className="mt-0.5 text-[10px] text-[#8a8278]"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {displayPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-[#2a2a2a] pt-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                      <span
                        className="text-xs text-[#8a8278]"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Subtotal ({count} {count === 1 ? "item" : "items"})
                      </span>
                      <span
                        className="text-sm text-[#e8e2d8]"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {displayPrice(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span
                        className="text-xs text-[#8a8278]"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Shipping
                      </span>
                      <span
                        className="text-sm text-[#e8e2d8]"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {shippingCost === 0 ? "Free" : displayPrice(shippingCost)}
                      </span>
                    </div>
                    <div className="my-2 border-t border-[#2a2a2a]" />
                    <div className="flex justify-between">
                      <span
                        className="text-xs uppercase tracking-[0.15em] text-[#8a8278]"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Total
                      </span>
                      <span
                        className="text-xl font-light text-[#e8e2d8]"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {displayPrice(total)}
                      </span>
                    </div>
                  </div>
                </div>

                {orderError && (
                  <p
                    className="mt-4 text-xs text-red-400"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {orderError}
                  </p>
                )}

                <button
                  onClick={handlePlaceOrder}
                  disabled={orderLoading || !activeTierId}
                  className="mt-6 flex w-full items-center justify-center gap-2 bg-[#c8a96e] py-3.5 text-xs uppercase tracking-[0.25em] text-[#0a0a0a] transition-colors hover:bg-[#b8994e] disabled:cursor-not-allowed disabled:opacity-50"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {orderLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {orderLoading ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
