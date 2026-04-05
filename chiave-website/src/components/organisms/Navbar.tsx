"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User } from "lucide-react";
import { useCart } from "@mantaray-digital/store-sdk/react";
import { useAuthStore } from "@/stores/auth-store";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/studio", label: "Studio" },
  { href: "/shop", label: "Shop" },
  { href: "/arthaus", label: "Arthaus" },
  { href: "/playground", label: "Playground" },
  { href: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart } = useCart();
  const itemCount = cart?.itemCount ?? 0;
  const customerId = useAuthStore((s) => s.customerId);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* ── Main Navbar ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 mix-blend-difference"
        style={{ transition: "padding 0.5s var(--ease-out-expo)" }}
      >
        <div
          className="flex items-center justify-between w-full"
          style={{
            paddingTop: scrolled ? "1rem" : "1.8rem",
            paddingBottom: scrolled ? "1rem" : "1.8rem",
            paddingLeft: "clamp(1.5rem, 4vw, 3rem)",
            paddingRight: "clamp(1.5rem, 4vw, 3rem)",
            transition: "padding 0.5s var(--ease-out-expo)",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="relative z-50 text-white no-underline"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.1rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              fontWeight: 400,
            }}
          >
            Chiave
          </Link>

          {/* Desktop Links + Cart */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8 list-none m-0 p-0">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="nav-link relative text-white no-underline"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.7rem",
                      fontWeight: 300,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                    }}
                    data-active={isActive(href) ? "" : undefined}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* User Icon */}
            <Link
              href={customerId ? "/account" : "/account/login"}
              className="relative flex items-center justify-center text-white"
              aria-label={customerId ? "My account" : "Sign in"}
            >
              <User className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </Link>

            {/* Cart Icon */}
            <Link
              href="/shop/cart"
              className="relative flex items-center justify-center text-white"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[16px] h-4 rounded-full bg-[#c8a96e] text-[#0a0a0a] text-[10px] font-semibold leading-none px-1">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile: User + Cart + Hamburger */}
          <div className="flex md:hidden items-center gap-4">
            <Link
              href={customerId ? "/account" : "/account/login"}
              className="relative z-50 flex items-center justify-center text-white"
              aria-label={customerId ? "My account" : "Sign in"}
            >
              <User className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </Link>

            <Link
              href="/shop/cart"
              className="relative z-50 flex items-center justify-center text-white"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[16px] h-4 rounded-full bg-[#c8a96e] text-[#0a0a0a] text-[10px] font-semibold leading-none px-1">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger */}
            <button
              className="relative z-50 flex flex-col justify-center items-center w-8 h-8 bg-transparent border-none cursor-pointer"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span
                className="block w-6 bg-white"
                style={{
                  height: "1px",
                  transition: "transform 0.4s var(--ease-out-expo), opacity 0.3s ease",
                  transform: menuOpen
                    ? "translateY(1px) rotate(45deg)"
                    : "translateY(-4px)",
                }}
              />
              <span
                className="block w-6 bg-white"
                style={{
                  height: "1px",
                  transition: "opacity 0.3s ease",
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-6 bg-white"
                style={{
                  height: "1px",
                  transition: "transform 0.4s var(--ease-out-expo), opacity 0.3s ease",
                  transform: menuOpen
                    ? "translateY(-1px) rotate(-45deg)"
                    : "translateY(4px)",
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu Overlay ── */}
      <div
        className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden"
        style={{
          backgroundColor: "#0a0a0a",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.5s var(--ease-out-expo)",
        }}
      >
        <ul className="list-none m-0 p-0 flex flex-col items-center gap-8">
          {NAV_LINKS.map(({ href, label }, i) => (
            <li
              key={href}
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.6s var(--ease-out-expo) ${0.15 + i * 0.07}s, transform 0.6s var(--ease-out-expo) ${0.15 + i * 0.07}s`,
              }}
            >
              <Link
                href={href}
                className="no-underline"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
                  fontWeight: 300,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: isActive(href) ? "#c8a96e" : "#e8e2d8",
                  transition: "color 0.3s ease",
                }}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

    </>
  );
}
