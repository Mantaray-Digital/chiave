"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface LightboxContextValue {
  open: (images: string[], startIndex?: number) => void;
  close: () => void;
}

const LightboxContext = createContext<LightboxContextValue>({
  open: () => {},
  close: () => {},
});

export function useLightbox() {
  return useContext(LightboxContext);
}

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback((imgs: string[], startIndex = 0) => {
    if (imgs.length === 0) return;
    setImages(imgs);
    setIndex(Math.max(0, Math.min(startIndex, imgs.length - 1)));
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setImages([]), 300);
  }, []);

  const next = useCallback(() => {
    setIndex((i) => (images.length === 0 ? 0 : (i + 1) % images.length));
  }, [images.length]);

  const prev = useCallback(() => {
    setIndex((i) =>
      images.length === 0 ? 0 : (i - 1 + images.length) % images.length
    );
  }, [images.length]);

  return (
    <LightboxContext.Provider value={{ open, close }}>
      {children}
      {images.length > 0 && (
        <LightboxOverlay
          src={images[index]}
          isOpen={isOpen}
          onClose={close}
          onPrev={prev}
          onNext={next}
          showNav={images.length > 1}
          counter={images.length > 1 ? `${index + 1} / ${images.length}` : null}
        />
      )}
    </LightboxContext.Provider>
  );
}

interface LightboxOverlayProps {
  src: string;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  showNav: boolean;
  counter: string | null;
}

function LightboxOverlay({
  src,
  isOpen,
  onClose,
  onPrev,
  onNext,
  showNav,
  counter,
}: LightboxOverlayProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNext();
      else if (e.key === "ArrowLeft") onPrev();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", onKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose, onNext, onPrev]);

  return (
    <div
      className={`fixed inset-0 z-[9998] transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0a0a0a]/95" />

      {/* Close */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close lightbox"
        className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1a1a]/60 text-[#e8e2d8] transition-colors hover:bg-[#1a1a1a] hover:text-[#c8a96e] sm:right-6 sm:top-6"
      >
        <X size={22} />
      </button>

      {/* Counter */}
      {counter && (
        <div
          className="absolute left-1/2 top-4 z-30 -translate-x-1/2 rounded-full bg-[#1a1a1a]/60 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-[#e8e2d8] sm:top-6"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {counter}
        </div>
      )}

      {/* Prev */}
      {showNav && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous image"
          className="absolute left-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#1a1a1a]/60 text-[#e8e2d8] transition-colors hover:bg-[#1a1a1a] hover:text-[#c8a96e] sm:left-6"
        >
          <ChevronLeft size={28} />
        </button>
      )}

      {/* Next */}
      {showNav && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next image"
          className="absolute right-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#1a1a1a]/60 text-[#e8e2d8] transition-colors hover:bg-[#1a1a1a] hover:text-[#c8a96e] sm:right-6"
        >
          <ChevronRight size={28} />
        </button>
      )}

      {/* Image stage — fills viewport with padding so img max-h/w fills the box */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-16 py-20 sm:px-24 sm:py-24">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={src}
          src={src}
          alt=""
          className="block h-auto w-auto max-h-full max-w-full object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}
