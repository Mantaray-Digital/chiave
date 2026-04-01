"use client";

import { useEffect, useState } from "react";

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 1000);

    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 1600);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#0a0a0a] transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <h1
        className="animate-pulse text-3xl font-light uppercase tracking-[0.4em] text-[#e8e2d8] md:text-5xl"
        style={{ fontFamily: "Cormorant Garamond, serif" }}
      >
        Chiave
      </h1>

      <div className="relative mt-6 h-[1px] w-40 overflow-hidden">
        <div className="preloader-line absolute inset-y-0 left-0 bg-[#c8a96e]" />
      </div>

      <style jsx>{`
        .preloader-line {
          animation: expandContract 1.2s ease-in-out infinite;
        }

        @keyframes expandContract {
          0% {
            width: 0%;
            left: 50%;
            transform: translateX(-50%);
          }
          50% {
            width: 100%;
            left: 50%;
            transform: translateX(-50%);
          }
          100% {
            width: 0%;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
