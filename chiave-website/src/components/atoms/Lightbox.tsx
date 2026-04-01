"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface LightboxContextValue {
  open: (src: string) => void;
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
  const [src, setSrc] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback((imageSrc: string) => {
    setSrc(imageSrc);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setSrc(null), 300);
  }, []);

  return (
    <LightboxContext.Provider value={{ open, close }}>
      {children}
      {src && <LightboxOverlay src={src} isOpen={isOpen} onClose={close} />}
    </LightboxContext.Provider>
  );
}

interface LightboxOverlayProps {
  src: string;
  isOpen: boolean;
  onClose: () => void;
}

function LightboxOverlay({ src, isOpen, onClose }: LightboxOverlayProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", onKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[9998] flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#0a0a0a]/90" />

      <button
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute right-6 top-6 z-10 text-3xl text-[#e8e2d8] transition-colors hover:text-[#c8a96e]"
      >
        &times;
      </button>

      <img
        src={src}
        alt=""
        className="relative z-10 max-h-[90vh] max-w-[90vw] object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
