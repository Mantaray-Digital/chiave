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
  title: "Chiave — Creative Direction & Design",
  description:
    "Where vision becomes form, and form becomes legacy. Chiave is the key to seven doors of art and design.",
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
        <Preloader />
        <CustomCursor />
        <MantarayClientProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </MantarayClientProvider>
        <BackToTop />
        <ScrollRevealProvider />
      </body>
    </html>
  );
}
