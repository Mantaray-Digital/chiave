"use client";

import { Suspense, useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  useCustomer,
  useMantarayStore,
} from "@mantaray-digital/store-sdk/react";
import { useAuthStore, useAuthHydrated, getSafeRedirect } from "@/stores/auth-store";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = getSafeRedirect(searchParams.get("redirect"));

  const store = useMantarayStore();
  const { login } = useCustomer();
  const customerId = useAuthStore((s) => s.customerId);
  const hydrated = useAuthHydrated();
  const setCustomer = useAuthStore((s) => s.setCustomer);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already logged in, redirect immediately
  useEffect(() => {
    if (hydrated && customerId) {
      router.replace(redirect);
    }
  }, [hydrated, customerId, redirect, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await login(email, password);
      store.setCustomer(result.customerId);
      setCustomer(result.customerId, result.name, result.email);
      router.replace(redirect);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const registerHref = redirect
    ? `/account/register?redirect=${encodeURIComponent(redirect)}`
    : "/account/register";

  // Show loading while hydrating or if already logged in
  if (!hydrated || customerId) {
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
            Welcome Back
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
              Sign In
            </h1>
          </div>
        </div>
      </section>

      {/* Login Form */}
      <section className="flex justify-center bg-[#0a0a0a] px-6 py-16">
        <div className="w-full max-w-[28rem] border border-[#2a2a2a] bg-[#0f0f0f] p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Email */}
            <div>
              <label
                className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-[#8a8278]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@example.com"
                className="w-full border border-[#2a2a2a] bg-transparent px-4 py-3 text-sm text-[#e8e2d8] outline-none transition-colors placeholder:text-[#4a4a4a] focus:border-[#c8a96e]"
                style={{ fontFamily: "var(--font-body)" }}
              />
            </div>

            {/* Password */}
            <div>
              <label
                className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-[#8a8278]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border border-[#2a2a2a] bg-transparent px-4 py-3 text-sm text-[#e8e2d8] outline-none transition-colors placeholder:text-[#4a4a4a] focus:border-[#c8a96e]"
                style={{ fontFamily: "var(--font-body)" }}
              />
            </div>

            {/* Error */}
            {error && (
              <p
                className="text-xs text-red-400"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 bg-[#c8a96e] py-3.5 text-xs uppercase tracking-[0.25em] text-[#0a0a0a] transition-colors hover:bg-[#b8994e] disabled:cursor-not-allowed disabled:opacity-50"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Register link */}
          <p
            className="mt-6 text-center text-xs text-[#8a8278]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Don&apos;t have an account?{" "}
            <Link
              href={registerHref}
              className="text-[#c8a96e] hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <section className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
          <Loader2 className="h-8 w-8 animate-spin text-[#c8a96e]" />
        </section>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
