import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { CustomCursor } from "@/components/atoms/CustomCursor";
import { Preloader } from "@/components/atoms/Preloader";
import { BackToTop } from "@/components/atoms/BackToTop";
import { ScrollRevealProvider } from "@/components/atoms/ScrollRevealProvider";
import { MantarayClientProvider } from "@/lib/mantaray-provider";
import { CartToastProvider } from "@/components/atoms/CartToast";
import { AuthRestorer } from "@/components/atoms/AuthRestorer";
import { Analytics } from "@/components/atoms/Analytics";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Chiave — Unlock Creative Vision",
    template: "%s — Chiave",
  },
  description:
    "Chiave is a design studio exploring seven creative disciplines — sculptures, visual arts, art pieces, 3D printing, scenes, characters, and animation.",
  keywords: ["Chiave", "design studio", "art", "sculptures", "3D printing", "Egypt"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Chiave",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${outfit.variable} h-full`}
    >
      <body className="min-h-full flex flex-col animate-page-in">
        <Analytics />
        <Preloader />
        <CustomCursor />
        <MantarayClientProvider>
          <AuthRestorer />
          <CartToastProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartToastProvider>
        </MantarayClientProvider>
        <BackToTop />
        <ScrollRevealProvider />
      </body>
    </html>
  );
}
