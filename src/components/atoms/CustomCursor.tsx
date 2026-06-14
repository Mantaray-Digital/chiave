"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);
  const visible = useRef(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const dot = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (!visible.current) {
        visible.current = true;
        dot.style.opacity = "1";
        ringEl.style.opacity = "1";
      }

      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    };

    const onMouseLeave = () => {
      visible.current = false;
      dot.style.opacity = "0";
      ringEl.style.opacity = "0";
    };

    const onMouseEnter = () => {
      visible.current = true;
      dot.style.opacity = "1";
      ringEl.style.opacity = "1";
    };

    const hoverableSelector = "a, button, [data-hover], input, textarea, select";

    const onPointerOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest(hoverableSelector)) {
        ringEl.classList.add("hovering");
      }
    };

    const onPointerOut = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest(hoverableSelector)) {
        ringEl.classList.remove("hovering");
      }
    };

    const animate = () => {
      const lerp = 0.12;
      ring.current.x += (mouse.current.x - ring.current.x) * lerp;
      ring.current.y += (mouse.current.y - ring.current.y) * lerp;

      ringEl.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;

      rafId.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-[#c8a96e] opacity-0"
        style={{ mixBlendMode: "difference", transition: "opacity 0.3s" }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-10 w-10 rounded-full border border-[#c8a96e] opacity-0 transition-[width,height,margin] duration-300 ease-out [&.hovering]:h-16 [&.hovering]:w-16 [&.hovering]:-ml-3 [&.hovering]:-mt-3"
        style={{ mixBlendMode: "difference", transition: "opacity 0.3s, width 0.3s, height 0.3s, margin 0.3s" }}
      />
    </>
  );
}
