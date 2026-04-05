"use client";

import { Suspense, useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  useCustomer,
  useMantarayStore,
} from "@mantaray-digital/store-sdk/react";
import { useAuthStore } from "@/stores/auth-store";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const store = useMantarayStore();
  const { register, login } = useCustomer();
  const customerId = useAuthStore((s) => s.customerId);
  const setCustomer = useAuthStore((s) => s.setCustomer);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // If already logged in, redirect immediately
  useEffect(() => {
    if (customerId) {
      router.replace(redirect || "/account");
    }
  }, [customerId, redirect, router]);

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validate()) return;

    setLoading(true);

    try {
      await register({
        email,
        password,
        name: name.trim(),
        ...(phone.trim() ? { phone: phone.trim() } : {}),
      });

      // Auto-login after registration
      const loginResult = await login(email, password);
      store.setCustomer(loginResult.customerId);
      setCustomer(loginResult.customerId, loginResult.name, loginResult.email);
      router.push(redirect || "/account");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const loginHref = redirect
    ? `/account/login?redirect=${encodeURIComponent(redirect)}`
    : "/account/login";

  // Don't render the form if already logged in
  if (customerId) {
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
            Join Us
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
              Create Account
            </h1>
          </div>
        </div>
      </section>

      {/* Register Form */}
      <section className="flex justify-center bg-[#0a0a0a] px-6 py-16">
        <div className="w-full max-w-md border border-[#2a2a2a] bg-[#0f0f0f] p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Name */}
            <div>
              <label
                className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-[#8a8278]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className={`w-full border ${fieldErrors.name ? "border-red-500/60" : "border-[#2a2a2a]"} bg-transparent px-4 py-3 text-sm text-[#e8e2d8] outline-none transition-colors placeholder:text-[#4a4a4a] focus:border-[#c8a96e]`}
                style={{ fontFamily: "var(--font-body)" }}
              />
              {fieldErrors.name && (
                <p
                  className="mt-1 text-xs text-red-400"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {fieldErrors.name}
                </p>
              )}
            </div>

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@example.com"
                className={`w-full border ${fieldErrors.email ? "border-red-500/60" : "border-[#2a2a2a]"} bg-transparent px-4 py-3 text-sm text-[#e8e2d8] outline-none transition-colors placeholder:text-[#4a4a4a] focus:border-[#c8a96e]`}
                style={{ fontFamily: "var(--font-body)" }}
              />
              {fieldErrors.email && (
                <p
                  className="mt-1 text-xs text-red-400"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Phone (optional) */}
            <div>
              <label
                className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-[#8a8278]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Phone{" "}
                <span className="normal-case tracking-normal text-[#5a5a5a]">
                  (optional)
                </span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+20 123 456 7890"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className={`w-full border ${fieldErrors.password ? "border-red-500/60" : "border-[#2a2a2a]"} bg-transparent px-4 py-3 text-sm text-[#e8e2d8] outline-none transition-colors placeholder:text-[#4a4a4a] focus:border-[#c8a96e]`}
                style={{ fontFamily: "var(--font-body)" }}
              />
              {fieldErrors.password && (
                <p
                  className="mt-1 text-xs text-red-400"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {fieldErrors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-[#8a8278]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className={`w-full border ${fieldErrors.confirmPassword ? "border-red-500/60" : "border-[#2a2a2a]"} bg-transparent px-4 py-3 text-sm text-[#e8e2d8] outline-none transition-colors placeholder:text-[#4a4a4a] focus:border-[#c8a96e]`}
                style={{ fontFamily: "var(--font-body)" }}
              />
              {fieldErrors.confirmPassword && (
                <p
                  className="mt-1 text-xs text-red-400"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {fieldErrors.confirmPassword}
                </p>
              )}
            </div>

            {/* General Error */}
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
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Login link */}
          <p
            className="mt-6 text-center text-xs text-[#8a8278]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Already have an account?{" "}
            <Link href={loginHref} className="text-[#c8a96e] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <section className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
          <Loader2 className="h-8 w-8 animate-spin text-[#c8a96e]" />
        </section>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}
